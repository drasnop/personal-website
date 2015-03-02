app.controller('logoCtrl', ['$scope','$sce', function($scope,$sce) {

   $scope.model = {
      // -1=empty, 0=logo, 1=about, 2=projects
      "state": -1,
      // true when hovering on the logo
      "mouseover": false,
      // text shown at the top of the page
      "heading": ""
   }

   $scope.getTrustedHtml=function(html){
      return $sce.trustAsHtml(html);
   }

   // Using $watch is a bit inefficient in this case as this function will always be run to check for changes.
   $(window).resize(function() {
      // redraw without actually changing the current state
      $scope.$apply(function() {
         changeState($scope.model.state, true);
      });
   });

   $scope.unfoldLogo = function() {
      drawing.initializeLogo(drawing.largeInnerWidth, drawing.largeInnerWidth, drawing.largeStroke);
      changeState(0);
   }

   $scope.clickA = function() {
      if($scope.model.state == 1)
         changeState(0);
      else
         changeState(1);
   }

   $scope.clickP = function() {
      if($scope.model.state == 2)
         changeState(0);
      else
         changeState(2);
   }

   function changeState(newState, dontAnimate) {

      // start appropriate drawing and transitions based on previous state
      if(newState === 0) {
         if($scope.model.state == -1)
            drawing.firstDrawLogo(drawing.largeInnerWidth, drawing.largeInnerWidth, drawing.largeStroke);
         else
            drawing.drawLogo(drawing.largeInnerWidth, drawing.largeInnerWidth, drawing.largeStroke, newState, true && !dontAnimate);
      }
      else {
         var width = $(".logo-col").width();
         // don't animate if the current is either 1 or 2
         if($scope.model.state <= 0)
            drawing.drawLogo(width, width, drawing.smallStroke, newState, true);
         else
            drawing.drawLogo(width, width, drawing.smallStroke, newState, false);
      }

      // update state
      $scope.model.state = newState;

      // navigate to corresponding content
      switch($scope.model.state) {
         case 0:
            window.location.href = "#!";
            $scope.model.heading = "";
            break;
         case 1:
            window.location.href = "#!about";
            $scope.model.heading = "bout me";
            break;
         case 2:
            window.location.href = "#!projects";
            $scope.model.heading = "rojects";
            break;
      }
   }

}]);



app.controller('projectsCtrl', ['$scope', '$http', function($scope, $http) {
   $http.get('js/projects.json').success(function(data) {
      $scope.projects = data;
   });

   $scope.toggleProjectDetails=function(project){
      project.detailsVisible= !project.detailsVisible;
      project.pictureVisible= project.detailsVisible;  
   }
}]);



app.controller('aboutCtrl', ['$scope', function($scope){
   
   // Adjust this view just after the template has been loaded
   $scope.$on('$routeChangeSuccess', function () {
      // Resize the round images to have the size of the logo
      var width = $(".logo-col").width();
      $(".round-image").width(width);

      // Resize the (empty) highlighting divs to have the size of the ones containing text
      var height = $(".highlighted.master").height();
      $(".highlighted.master").siblings(".highlighted.slave").height(height);
   });
}])