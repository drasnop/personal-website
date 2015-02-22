var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
   function($routeProvider, $locationProvider) {

      // following Google’s Making AJAX applications crawlable guide
      $locationProvider.hashPrefix('!');

      $routeProvider
         .when('/about', {
            templateUrl: 'html/about.html',
            controller: 'aboutCtrl'
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
