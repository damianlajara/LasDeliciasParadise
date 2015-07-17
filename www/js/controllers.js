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
          data.title = "WORKED!"
        })
        .error(function (status) {
          console.log("Error in handling json!");
        });
    }
  }
})

.controller('SpecialDetailCtrl', function ($scope, $stateParams, JsonSpecials) {
  JsonSpecials.retrieveData().then(function(httpObj){
    var specials = httpObj.data;
    //Simple id lookup
    for (var i = 0; i < specials.length; i++) {
       if (specials[i].id == $stateParams.specialId) {
         $scope.special = specials[i];
         break;
       }
     }
  });
});
