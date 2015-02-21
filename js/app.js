var app = angular.module('myApp', ['ngRoute']);

app.controller('projectsCtrl', ['$scope', '$http', function($scope, $http) {
   $http.get('js/projects.json').success(function(data) {
      $scope.projects = data;
   });
}]);

app.config(['$routeProvider',
   function($routeProvider) {
      $routeProvider.
      when('/about', {
         templateUrl: 'html/about.html',
      }).
      when('/projects', {
         templateUrl: 'html/projects.html',
         controller: 'projectsCtrl'
      }).
      otherwise({
         redirectTo: '/about'
      });
   }
]);
