/*
 * Initializes the Angular app, and handle page navigation
 */

var app = angular.module('myApp', ['ui.bootstrap', 'ngRoute', 'ngTouch', 'ngAnimate']);

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

app.run(function($rootScope, $location, $anchorScroll, $routeParams, $http) {

   // set up single-page application analytics tracking
   $rootScope.$on('$routeChangeSuccess', function(newRoute) {
      ga('set', 'page', $location.path());
      ga('send', 'pageview');
   })

   // load projects and attach them to rootScope
   $http.get('js/projects.json').success(function(data) {
      $rootScope.projects = data;
      preloadImages();
   });

   function preloadImages() {
      jQuery.get("img/Antoine.jpg");

      // all project thumbnails
      var icons = $rootScope.projects.map(function(project) {
         return "img/" + project.id + "/" + project.icon;
      });

      // first picture of each carousel
      var firsts = $rootScope.projects.map(function(project) {
         return "img/" + project.id + "/" + project.pictures[0];
      });

      // AJAX calls
      jQuery.each(icons.concat(firsts), function(i, source) {
         var img = new Image();
         img.src = source;
      });
   }

   /*  //when the route is changed scroll to the proper element.
     $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
       $location.hash($routeParams.scrollTo);
       $anchorScroll();
       $location.search('scrollTo', null); 
     });*/
});
