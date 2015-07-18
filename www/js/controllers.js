angular.module('starter.controllers', [])

.controller('MenuCtrl', function ($scope) {

})

.controller('AboutUsCtrl', function ($scope) {
  $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: 'http://placekitten.com/' + newWidth + '/300',
        text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
          ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }
})

.controller('HomeCtrl', function ($scope,$sce) {
  $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = $sce.trustAsHtml('I\'ve been made <b>bold</b>!');

})

.controller('BookingsCtrl', function ($scope) {
   $scope.today = function() {
     $scope.dt = new Date();
   };
   $scope.today();

   $scope.clear = function () {
     $scope.dt = null;
   };

   // Disable weekend selection
   $scope.disabled = function(date, mode) {
     return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
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
   $scope.events =
     [
       {
         date: tomorrow,
         status: 'full'
       },
       {
         date: afterTomorrow,
         status: 'partially'
       }
     ];

   $scope.getDayClass = function(date, mode) {
     if (mode === 'day') {
       var dayToCheck = new Date(date).setHours(0,0,0,0);

       for (var i=0;i<$scope.events.length;i++){
         var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

         if (dayToCheck === currentDay) {
           return $scope.events[i].status;
         }
       }
     }

     return '';
   };
})

.controller('EventsCtrl', function ($scope, JsonEvents) {

  JsonEvents.retrieveData().then(function(httpObj){
    $scope.events = httpObj.data;
  });
})

.controller('EventDetailCtrl', function ($scope, $stateParams, JsonEvents) {
  JsonEvents.retrieveData().then(function(httpObj){
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
.factory('JsonEvents', function ($http){
  return {
    retrieveData : function() {
      return $http
        .get('js/events.json')
        .success(function(data) {
          console.log("Success in parsing json!", data);
        })
        .error(function (status) {
          console.log("Error in parsing json!");
        });
    }
  }
});
