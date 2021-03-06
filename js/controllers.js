/*
 * Defines the model and the controllers for the different parts of the app
 */

var model = {
   // -1=empty, 0=logo, 1=about, 2=projects
   "state": -1,
   // previous state
   "prevState": -1,
   // true when hovering on the logo
   "mouseover": false,
   // text shown at the top of the page
   "heading": ["", "bout me", "rojects"],
   // filter the projects by this tag
   "tag": "All",
   // when user is hovering on a tag [deprecated]
   "tagHovered": false,
};


app.controller('mainCtrl', ['$scope', '$sce', '$location', '$timeout', function($scope, $sce, $location, $timeout) {

   $scope.model = window.model;

   $scope.$on('$routeChangeSuccess', function() {

      model.prevState = model.state;

      // update state
      switch ($location.path()) {
         case "/about":
            model.state = 1;
            break;
         case "/projects":
            model.state = 2;
            break;
         default:
            model.state = 0;
            break;
      }

      // let logo know that location has changed
      $scope.$broadcast('stateChanged');

      // handle staggered entrance animation of projects
      if (model.state == 2) {
         // When coming from state 0, start manually the staggered entrance animation AFTER the screen transition completes
         // (to prevent the staggered animation from playing when the projects are still outside of the screen / below the fold)
         // Otherwise, manually start the staggered entrance animation with no delay
         var delay = 10;
         if (model.prevState <= 0)
            delay = drawing.longAnimation;

         $timeout(function() {
            console.log("staggered animation");
            model.tag = "All";
         }, delay);
      } else {
         // re-initialize projects list
         $scope.collapseProjects();
         model.tag = "";
      }
   });

   $scope.collapseProjects = function() {
      if ($scope.projects) {
         $scope.projects.forEach(function(project) {
            project.detailsVisible = false;
            project.pictureVisible = false;
         });
      }
   };

   $scope.getTrustedHtml = function(html) {
      return $sce.trustAsHtml(html);
   };

   $scope.smallScreen = function() {
      return window.innerWidth >= 768;
   };

}]);


/* --------------- Logo Controller -------------- */

app.controller('logoCtrl', ['$scope', function($scope) {

   // called when logo.html is loaded. Initialize the logo and play the animation
   $scope.unfoldLogo = function() {
      drawing.initializeLogo(drawing.largeInnerWidth, drawing.largeInnerWidth, drawing.largeStroke);
      // sad workaround because ng-cloak doesn't seem to have an effect in Firefox...
      $("#logoText").removeAttr("style");
      $scope.drawAppropriateLogo(true);
   };

   // called everytime the state (hence the route) has changed
   $scope.$on('stateChanged', function() {
      $scope.drawAppropriateLogo(true);
   });

   // Using $watch would be a bit inefficient in this case as this function will always be run to check for changes.
   $(window).resize(function() {
      $scope.$evalAsync(function() {
         // Resize and reposition the logo
         $scope.drawAppropriateLogo(false);
         // Resize the round images to have the size of the logo
         $(".round-image").width($("#logoProjects").width());
      });
   });

   $scope.drawAppropriateLogo = function(animate) {

      // start appropriate drawing and transitions based on previous state
      var logoWidth;

      if (model.state === 0) {

         /* draw large logo, fullscreen */

         logoWidth = drawing.largeInnerWidth;
         $("#logoSplash").width(drawing.logoWidth());

         // it should be only -1; but in some cases the route changes twice on loading (hence we're already at state 0)
         // however, when resizing the window on the splashscreen, we don't want it to animate
         //console.log(model.prevState, model.state, animate)

         if (model.prevState <= 0 && animate) {
            drawing.firstDrawLogo(logoWidth, logoWidth, drawing.largeStroke);
         } else {
            drawing.drawLogo(logoWidth, logoWidth, drawing.largeStroke, model.state, animate ? drawing.longAnimation : false, false);
         }
      } else {

         /* draw small logo, at the top-left of the header */

         logoWidth = $("#logoProjects").width();
         // need to fake it because doesn't contain any svg
         $("#logoSplash").width(drawing.logoWidth());

         // just to adapt the time and smoothness of the animation
         switch (model.prevState) {
            case -1:
               drawing.drawLogo(logoWidth, logoWidth, drawing.smallStroke, model.state, false, false);
               break;
            case 0:
               drawing.drawLogo(logoWidth, logoWidth, drawing.smallStroke, model.state, animate ? drawing.longAnimation : false, false);
               break;
            default:
               // short, cubic animation between state 1 and 2
               //drawing.drawLogo(logoWidth, logoWidth, drawing.smallStroke, model.state, animate ? drawing.shortAnimation : false, true);
               // now that the logo stays in the same place, don't fade in the text
               drawing.drawLogo(logoWidth, logoWidth, drawing.smallStroke, model.state, false, false);
               break;
         }
      }

   };

   // start animation and remove the on(animationiteration) binding, if any (to keep looping forever)
   $scope.startHintAnimation = function(selector) {
      $(selector).addClass("animated");
      $(selector).off("animationiteration webkitAnimationIteration oanimationiteration MSAnimationIteration");
   };

   // stops the animation at the next end of an iteration, to avoid the hint jumping back into place on mouseleave
   $scope.endHintAnimation = function(selector) {
      $(selector).on("animationiteration webkitAnimationIteration oanimationiteration MSAnimationIteration", function() {
         $(selector).removeClass("animated");
      });
   };
}]);


/* --------------- Projects Controller -------------- */

app.controller('projectsCtrl', ['$scope', '$timeout', function($scope, $timeout) {

   $scope.tags = ["All", "Interaction Design", "Visual Design", "User Research", "Web", "Mobile", "Other"];

   // play special staggered animation when the projects view loads
   $scope.onload = function() {
      if (!$("#staggered-transitions").length) {
         $("head").append("<style id='staggered-transitions'>" +
            ".project.ng-enter-stagger, " +
            ".project.ng-leave-stagger {" +
            //this will have a 100ms delay between each successive leave animation
            "transition-delay: 0.1s; " +
            //As of 1.4.4, this must always be set: it signals ngAnimate to not accidentally inherit a delay property from another CSS class
            "transition-duration: 0s;" +
            "} < /style>");
      }
   };
   $scope.onload();

   $scope.toggleProjectDetails = function(project) {
      project.detailsVisible = !project.detailsVisible;
      project.pictureVisible = project.detailsVisible;
   };

   $scope.changeTag = function(tag) {
      // Note that the staggering doesn't work well with this method of animation:
      // The elements that are leaving flash at the bottom of the list, since they disappear a bit later than the ones above
      // Besides, the "leave" animation is cut short (or not even started) after 250ms, when we change the tag
      $("#staggered-transitions").remove();

      // We must collapse the open projects first, otherwise the transition will flatten them as a huge white rectangle
      $scope.collapseProjects();

      // Wait for the projects to be closed before starting the transitions
      $timeout(function() {
         model.tag = "";

         $timeout(function() {
            model.tag = tag;
         }, 250);
      });
   };
}]);

app.filter('filterByTag', function() {
   return function(input, tag) {
      if (typeof input == 'undefined')
         return;
      if (tag == "All")
         return input;
      return input.filter(function(project) {
         return project.tags.indexOf(tag) >= 0;
      });
   };
});

app.animation('.project-details', [function() {
   return {
      enter: function(element, doneFn) {
         // ng-if shows .project-details immediately, so we hide it with display:none by default in CSS
         // 150ms delay to wait for the thumbnail to expand
         $(element).delay(150).slideDown(500, doneFn);
      },

      leave: function(element, doneFn) {
         $(element).delay(150).slideUp(500, doneFn);
      }
   };
}]);

/* --------------- About Controller -------------- */

app.controller('aboutCtrl', ['$scope', function($scope) {

   // Adjust this view just after the template has been loaded
   $scope.$on('$routeChangeSuccess', function() {
      // Resize the round images to have the size of the logo
      $(".round-image").width($("#logoProjects").width());
   });

}]);
