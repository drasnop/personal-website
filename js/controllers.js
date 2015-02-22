app.controller('logoCtrl', ['$scope', function($scope) {

   $scope.model = {
      // -1=empty, 0=logo, 1=about, 2=projects
      "state": -1,
      // true when hovering on the logo
      "mouseover": false,
      // text shown at the top of the page
      "heading": ""
   }

   // Using $watch is a bit inefficient in this case as this function will always be run to check for changes.
   $(window).resize(function() {
      // redraw without actually changing the current state
      $scope.$apply(function() {
         changeState($scope.model.state);
      });
   });

   $scope.unfoldLogo = function() {
      initializeLogo(largeInnerWidth, largeInnerWidth, largeStroke);
      changeState(0);
      bindListeners();
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

   function changeState(newState) {

      // start appropriate drawing and transitions based on previous state
      if(newState === 0) {
         if($scope.model.state == -1)
            firstDrawLogo(largeInnerWidth, largeInnerWidth, largeStroke);
         else
            drawLogo(largeInnerWidth, largeInnerWidth, largeStroke, newState, true, false);
      }
      else {
         var width = $(".logo-col").width();
         if($scope.model.state <= 0)
            drawLogo(width, width, smallStroke, newState, true, true);
         else
            drawLogo(width, width, smallStroke, newState, false, true);
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