angular.module('starter.controllers', [])

.controller('MenuCtrl', function ($scope) {

})

.controller('HomeCtrl', function ($scope) {

})

.controller('BookingsCtrl', function ($scope) {

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
