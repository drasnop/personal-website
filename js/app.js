var app = angular.module('myApp', ['ngRoute']);

app.controller('logoCtrl', ['$scope', function($scope){
   $scope.state=0;
   
   $scope.unfoldLogo=function(){
      initializeLogo(largeInnerWidth, largeInnerWidth, largeStroke);
      displayState(0, true, true);
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
