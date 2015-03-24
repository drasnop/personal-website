var model={
   // -1=empty, 0=logo, 1=about, 2=projects
   "state": -1,
   // previous state
   "prevState":-1,
   // true when hovering on the logo
   "mouseover": false,
   // text shown at the top of the page
   "heading": ["","bout me","rojects"],
   // filter the projects by this tag
   "tag": "All",
   // when user is hovering on a tag
   "tagHovered": false
}


app.controller('mainCtrl', ['$scope','$sce','$location', function($scope,$sce,$location) {

   $scope.model = window.model;

   $scope.$on('$routeChangeSuccess', function () {
      $scope.handleRouteChange();
   })

   $scope.handleRouteChange=function(){

      model.prevState=model.state

      // update state
      switch($location.path()){
         case "/about":
            model.state=1;
         break;
         case "/projects":
            model.state=2;
         break;
         default:
            model.state=0;
         break;
      }
   
      $scope.drawAppropriateLogo(true);
   }

   $scope.drawAppropriateLogo=function(animate){

      // start appropriate drawing and transitions based on previous state
      var logoWidth;
      if(model.state === 0) {
         // draw large logo, fullscreen
         logoWidth=drawing.largeInnerWidth;

         // it should be only -1; but in some cases the route changes twice on loading (hence we're already at state 0)
         if(model.prevState <= 0){
            drawing.firstDrawLogo(logoWidth, logoWidth, drawing.largeStroke);
         }
         else
            drawing.drawLogo(logoWidth, logoWidth, drawing.largeStroke, model.state, animate? drawing.longAnimation : false, false);
      }
      else {
         logoWidth = $("#logoProjects").width();

         // just to adapt the time and smoothness of the animation
         switch(model.prevState){
            case -1:
               drawing.drawLogo(logoWidth, logoWidth, drawing.smallStroke, model.state, false, false);
            break;
            case 0:
               drawing.drawLogo(logoWidth, logoWidth, drawing.smallStroke, model.state, animate? drawing.longAnimation : false, false);
            break;
            default:
               // short, cubic animation between state 1 and 2
               drawing.drawLogo(logoWidth, logoWidth, drawing.smallStroke, model.state, animate? drawing.shortAnimation : false, true);
            break;
         }
      }
      
   }


   // wait until logo is created to play the animation
   $scope.unfoldLogo = function() {
      drawing.initializeLogo(drawing.largeInnerWidth, drawing.largeInnerWidth, drawing.largeStroke);
      //$scope.handleRouteChange()
      $scope.drawAppropriateLogo(false);
   }

   // Using $watch is a bit inefficient in this case as this function will always be run to check for changes.
   $(window).resize(function() {
      $scope.$apply(function() {
         // Resize and reposition the logo
         $scope.drawAppropriateLogo(false);
         // Resize the round images to have the size of the logo
         $(".round-image").width($("#logoProjects").width());
      });
   });

   $scope.getTrustedHtml=function(html){
      return $sce.trustAsHtml(html);
   }

}])



app.controller('projectsCtrl', ['$scope', '$http', function($scope, $http) {
   $http.get('js/projects.json').success(function(data) {
      $scope.projects = data;
   });

   $scope.tags=["All", "Interaction Design","Visual Design", "User Research", "Web", "Mobile", "Other"]

   $scope.toggleProjectDetails=function(project){
      project.detailsVisible= !project.detailsVisible;
      project.pictureVisible= project.detailsVisible;  
   }
}]);

app.filter('filterByTag', function() {
   return function(input, tag) {
      if(tag=="All")
         return input;
      return input.filter(function(project){
         return project.tags.indexOf(tag) >= 0;
      })
   }
})


app.controller('aboutCtrl', ['$scope', function($scope){

   // Adjust this view just after the template has been loaded
   $scope.$on('$routeChangeSuccess', function () {
      // Resize the round images to have the size of the logo
      $(".round-image").width($("#logoProjects").width());
   });

}])