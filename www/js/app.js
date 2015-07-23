// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

// Global firebase reference. By setting it globally, it will load before AngularJS and can be used throughout the application.
var firebaseRef = new Firebase("https://appsample.firebaseio.com");

angular.module('starter', ['ionic', 'starter.controllers', 'ui.bootstrap', 'ngAnimate', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    // Sign up/login Form
    .state('login', {
      //cache: false,
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'AuthCtrl'
    })
    .state('signup', {
      //cache: false,
      url: "/signup",
      templateUrl: "templates/signup.html",
      controller: 'AuthCtrl'
    })

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
      //TODO Create profile state here. Will have the users icon as a picture as well as the settings that the user will want to changes
      //TODO Thinking of using a settings modal where the user can click on something and it will automatically update it
      //and then bring the user back to the original Page with the settings changed
      //maybe use an ngModel to bind the data after performing a query from the server to retireve all the users data into a service or array
      .state('menu.profile', {
        url: "/profile",
        views: {
          'menuContent': {
              templateUrl:"templates/profile.html",
              controller: "ProfileCtrl"
          }
        }
      })
    .state('menu.aboutUs', {
      url: "/aboutUs",
      views: {
        'menuContent': {
          templateUrl: "templates/aboutUs.html",
          controller: 'AboutUsCtrl'
        },
        /* Angular ui-router absolute View Names */
        // https://github.com/angular-ui/ui-router/wiki/Multiple-Named-Views
        'tab-home@menu.aboutUs': {
          templateUrl: 'templates/tabHome.html',
          controller: 'TabHomeCtrl'
        },
        'tab-terms@menu.aboutUs': {
          templateUrl: 'templates/tabTerms.html',
          controller: 'TabTermsCtrl'
        },
        'tab-contact@menu.aboutUs': {
          templateUrl: 'templates/tabContact.html',
          controller: 'TabContactCtrl'
        }
      }
    })
    .state('menu.terms', {
        url: "/terms",
        views: {
          'menuContent': {
            templateUrl: "templates/tabTerms.html",
            controller: 'TabTermsCtrl'
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
  $urlRouterProvider.otherwise('/login');
});
