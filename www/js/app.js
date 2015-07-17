// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers','ui.bootstrap','ngAnimate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('menu', {
      url: "/menu",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'MenuCtrl'
  })
  .state('menu.home', {
     url: "/home",
     views: {
       'menuContent': {
         templateUrl: "templates/home.html",
         controller: 'HomeCtrl'
       }
     }
   })
   .state('menu.bookings', {
        url: "/bookings",
        views: {
          'menuContent': {
            templateUrl: "templates/bookings.html",
            controller: 'BookingsCtrl'
          }
        }
      })
   .state('menu.events', {
      url: "/events",
      views: {
        'menuContent': {
          templateUrl: "templates/events.html",
          controller: 'EventsCtrl'
        }
      }
    })
    .state('menu.detail', {
    url: "/events/:eventId",
    views: {
      'menuContent': {
        templateUrl: "templates/eventDetail.html",
        controller: 'EventDetailCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/menu/home');
});
