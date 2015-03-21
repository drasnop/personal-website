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
   "tag": "All"
}


app.controller('mainCtrl', ['$scope','$sce','$location', function($scope,$sce,$location) {

   $scope.model = window.model;

   $scope.$on('$routeChangeSuccess', function () {
      console.log($location.path())

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
   })

   $scope.drawAppropriateLogo=function(animate){

      // start appropriate drawing and transitions based on previous state
      var logoWidth;
      if(model.state === 0) {
         // draw large logo, fullscreen
         logoWidth=drawing.largeInnerWidth;
         if(model.prevState == -1)
            drawing.firstDrawLogo(logoWidth, logoWidth, drawing.largeStroke);
         else
            drawing.drawLogo(logoWidth, logoWidth, drawing.largeStroke, model.state, animate? drawing.longAnimation : false, false);
      }
      else {
         logoWidth = $("#logoProjects").width();

         if(model.prevState <= 0)
            drawing.drawLogo(logoWidth, logoWidth, drawing.smallStroke, model.state, animate? drawing.longAnimation : false, false);
         else
            drawing.drawLogo(logoWidth, logoWidth, drawing.smallStroke, model.state, animate? drawing.shortAnimation : false, true);
      }
      
   }

   $scope.getTrustedHtml=function(html){
      return $sce.trustAsHtml(html);
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

}])

app.controller('logoCtrl', ['$scope', '$location', function($scope, $location) {

   $scope.unfoldLogo = function() {
      drawing.initializeLogo(drawing.largeInnerWidth, drawing.largeInnerWidth, drawing.largeStroke);
      $location.path("/");
   }

   $scope.clickA = function() {
      if($scope.model.state == 1)
         $location.path("/");
      else
         $location.path("/about");
   }

   $scope.clickP = function() {
      if($scope.model.state == 2)
         $location.path("/");
      else
         $location.path("/projects");
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
      $(".round-image").width($("#logoProjects").width());
   });

}])