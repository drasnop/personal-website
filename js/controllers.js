app.controller('logoCtrl', ['$scope', function($scope) {
   $scope.model = {
      "state": -1,
      "mouseover": false,
      "heading": ""
   }

   $(window).resize(function() {
      console.log(window.innerWidth);

      $scope.$apply(function() {
         // redraw without actually changing the current state
         changeState($scope.model.state);
         resizeAll();
      });
   });

   $scope.unfoldLogo = function() {
      initializeLogo(largeInnerWidth, largeInnerWidth, largeStroke);
      changeState(0);
      resizeAll();
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
            drawLogo(largeInnerWidth, largeInnerWidth, largeStroke, true, false);
      }
      else {
         var width = $(".logo-col").width();
         if($scope.model.state <= 0)
            drawLogo(width, width, smallStroke, true, true);
         else
            drawLogo(width, width, smallStroke, false, true);
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
   $scope.$on('$routeChangeSuccess', function () {
      resizeAll();
   });
}])