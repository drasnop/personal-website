var app = angular.module('myApp', ['ngRoute']);

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
