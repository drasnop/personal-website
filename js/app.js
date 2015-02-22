var app = angular.module('myApp', ['ngRoute']);

app.controller('logoCtrl', ['$scope', function($scope){
   $scope.model={
      "state": 0,
      "mouseover": false
   }
   
   $scope.unfoldLogo=function(){
      initializeLogo(largeInnerWidth, largeInnerWidth, largeStroke);
      displayState(0, true, true);
      resizeAll();
      bindListeners();
   }

   $scope.clickA=function(){
      if($scope.model.state==1){
         $scope.model.state=0;
         window.location.href="#!";
      }
      else{
         $scope.model.state=1;
         window.location.href="#!about";
      }
   }

   $scope.clickP=function(){
      if($scope.model.state==2){
         $scope.model.state=0;
         window.location.href="#!";
      }
      else{
         $scope.model.state=2;
         window.location.href="#!projects";
      }
   }
}]);

app.controller('projectsCtrl', ['$scope', '$http', function($scope, $http) {
   $http.get('js/projects.json').success(function(data) {
      $scope.projects = data;
   });
}]);

app.config(['$routeProvider', '$locationProvider',
   function($routeProvider, $locationProvider) {

      // following Google’s Making AJAX applications crawlable guide
      $locationProvider.hashPrefix('!');

      $routeProvider
         .when('/about', {
            templateUrl: 'html/about.html',
         })
         .when('/projects', {
            templateUrl: 'html/projects.html',
            controller: 'projectsCtrl'
         })
         .otherwise({
            template: ""
         });
   }
]);
