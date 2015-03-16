var model={
   // -1=empty, 0=logo, 1=about, 2=projects
   "state": -1,
   // true when hovering on the logo
   "mouseover": false,
   // text shown at the top of the page
   "heading": "",
   // filter the projects by this tag
   "tag": "All"
}


app.controller('logoCtrl', ['$scope','$sce', function($scope,$sce) {

   $scope.model = window.model;

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

}]);



app.controller('projectsCtrl', ['$scope', '$http', function($scope, $http) {
   $http.get('js/projects.json').success(function(data) {
      $scope.projects = data;
   });

   $scope.tags=["All", "Interaction Design","Visual Design", "Web", "Mobile", "User Research", "Other"]

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
      var width = $("#logoProjects").width();
      $(".round-image").width(width);

/*      // Resize the (empty) highlighting divs to have the size of the ones containing text
      var height = $(".highlighted.master").height();
      $(".highlighted.master").siblings(".highlighted.slave").height(height);*/
   });

   $scope.clickProjectsLink=function(){
      changeState(2);
   }
}])




function changeState(newState, dontAnimate) {
   console.log(newState, dontAnimate)

   // start appropriate drawing and transitions based on previous state
   var logoWidth;
   if(newState === 0) {
      // draw large logo, fullscreen
      logoWidth=drawing.largeInnerWidth;
      if(model.state == -1)
         drawing.firstDrawLogo(logoWidth, logoWidth, drawing.largeStroke);
      else
         drawing.drawLogo(logoWidth, logoWidth, drawing.largeStroke, newState, dontAnimate? false : drawing.longAnimation, false);
   }
   else {
      logoWidth = $("#logoProjects").width();

      if(model.state <= 0)
         drawing.drawLogo(logoWidth, logoWidth, drawing.smallStroke, newState, dontAnimate? false : drawing.longAnimation, false);
      else
         drawing.drawLogo(logoWidth, logoWidth, drawing.smallStroke, newState, dontAnimate? false : drawing.shortAnimation, true);
   }

   // update state
   model.state = newState;

   // navigate to corresponding content
   switch(model.state) {
      case 0:
         window.location.href = "#!";
         model.heading = "";
         break;
      case 1:
         window.location.href = "#!about";
         model.heading = "bout me";
         break;
      case 2:
         window.location.href = "#!projects";
         model.heading = "rojects";
         break;
   }

}