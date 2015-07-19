angular.module('starter.controllers', [])

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center')
})

.controller('MenuCtrl', function($scope) {

})

.controller('AuthCtrl', function ($scope, $state, $firebaseArray, $firebaseAuth) {

  var firebaseAuth = $firebaseAuth(firebaseRef);

  // Callback that gets called everything time the user state changes
  // Maybe attach to scope?
  firebaseAuth.$onAuth(function (authData) {
    if (authData) {
      console.log("Logged in as:", authData.uid);
      //$state.go('menu.home');
      //disbale history stack
    } else {
      console.log("Logged out");
      //$state.go('login');
      //disable history stack
    }
  });

  // Form data for the login modal
  $scope.loginData = {};

  // Form data for the login modal
  $scope.signupData = {};

  // Perform the login action when the user submits the login form
  $scope.login = function(loginForm) {
    // loginForm is the name we gave the form so we can validate the login request
    if (loginForm.$valid) {
      console.log('Doing login', $scope.loginData);
      firebaseAuth.$authWithPassword({
        email: $scope.loginData.email,
        password: $scope.loginData.password
      }).then(function (authData) {
        remember: "sessionOnly"
        console.log("Authenticated successfully with payload:", authData);
      }).catch(function (error) {
        console.error("Login Failed: " + error);
      });
    }
  };

  $scope.register = function(signupForm) {
    console.log("Inside sign up!");
    // This allows us to validate the form making sure all the fields were entered correctly
    if (signupForm.$valid) {
      console.log('Doing registration', $scope.signupData);
      //Create the user
      firebaseAuth.$createUser({
        email: $scope.signupData.email,
        password: $scope.signupData.password
      }).then(function (userData) {
        // Sign the user in for write access
        return firebaseAuth.$authWithPassword({
          email: $scope.signupData.email,
          password: $scope.signupData.password
        });
      }).then(function (authData) {
        // Clear the form

        // Save the user's data
        console.log("User Data: ", authData);
        console.log("Successfully created user account with uid:", authData.uid);
        firebaseRef.child("users").child(authData.uid).set({
          firstName: $scope.signupData.firstName,
          lastName: $scope.signupData.lastName,
          key: authData.uid, // ex: simplelogin:29
          memberSince: Firebase.ServerValue.TIMESTAMP,
          //I don't think we need these since we created the user already!
          email: $scope.signupData.email,
          password: $scope.signupData.password
        });
      }).catch(function (error) {
        console.error("ERROR: " + error);
      });
    }
  };

})

.controller('TabHomeCtrl', function($scope) {
  $scope.myInterval = 5000;
  var slides = $scope.slides = [];
  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/300',
      text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }
})

.controller('TabTermsCtrl', function($scope) {

})

.controller('TabContactCtrl', function($scope) {

})

.controller('AboutUsCtrl', function($scope, $state) {

})

.controller('HomeCtrl', function($scope, $sce) {
  $scope.dynamicTooltip = 'Hello, World!';
  $scope.dynamicTooltipText = 'dynamic';
  $scope.htmlTooltip = $sce.trustAsHtml('I\'ve been made <b>bold</b>!');

})

.controller('BookingsCtrl', function($scope) {
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events = [{
    date: tomorrow,
    status: 'full'
  }, {
    date: afterTomorrow,
    status: 'partially'
  }];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };
})

.controller('EventsCtrl', function($scope, JsonEvents) {

  JsonEvents.retrieveData().then(function(httpObj) {
    $scope.events = httpObj.data;
  });
})

.controller('EventDetailCtrl', function($scope, $stateParams, JsonEvents) {
  JsonEvents.retrieveData().then(function(httpObj) {
    var events = httpObj.data;
    //Simple id lookup
    for (var i = 0; i < events.length; i++) {
      if (events[i].id == $stateParams.eventId) {
        $scope.event = events[i];
        break;
      }
    }
  });
})

//$http returns a promise anyway so you don't need $q
.factory('JsonEvents', function($http) {
  return {
    retrieveData: function() {
      return $http
        .get('js/events.json')
        .success(function(data) {
          console.log("Success in parsing json!", data);
        })
        .error(function(status) {
          console.log("Error in parsing json!");
        });
    }
  }
})

/*Used to compare two form elements- Used in checked the password and password confirmation!*/
.directive("compareTo", function () {
  return {
    require: "ngModel",
    scope: {
      otherModelValue: "=compareTo"
    },
    link: function (scope, element, attributes, ngModel) {

      ngModel.$validators.compareTo = function (modelValue) {
        return modelValue === scope.otherModelValue;
      };

      scope.$watch("otherModelValue", function () {
        ngModel.$validate();
      });
    }
  };
});
