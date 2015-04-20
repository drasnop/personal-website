var app = angular.module('myApp', ['ui.bootstrap', 'ngRoute', 'ngTouch']);

app.config(['$routeProvider', '$locationProvider',
   function($routeProvider, $locationProvider) {

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
            redirectTo: '/'
         })
   }
]);

/*app.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  //when the route is changed scroll to the proper element.
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();
    $location.search('scrollTo', null); 
  });
});*/
