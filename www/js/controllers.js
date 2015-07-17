angular.module('starter.controllers', [])

.controller('MenuCtrl', function ($scope) {

})

.controller('HomeCtrl', function ($scope) {

})

.controller('SpecialsCtrl', function ($scope, JsonSpecials) {

  JsonSpecials.retrieveData().then(function(httpObj){
    $scope.specials = httpObj.data;
    console.log("Data", httpObj);
    console.log("Specials", $scope.specials);
  });
})

//$http returns a promise anyway so you don't need $q
.factory('JsonSpecials', function ($http){

  return {

    retrieveData : function() {
      return $http
        .get('js/specials.json')
        .success(function(data) {
          console.log("Success in handling json!");
          console.log("Parsed JSON Data: ", data);
        })
        .error(function (status) {
          console.log("Error in handling json!");
        });
    }
  }
})
