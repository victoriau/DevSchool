'use strict';

angular.module('pokExamApp')
  .controller('MainCtrl', function ($scope, $http, PokeFactory) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.test = "Victoria";

    PokeFactory.callPoke('getRandomPoke').then(function(results){
      var abilities = results.abilities;
      console.log(abilities);
      abilities.forEach(function(abilityObj){
        console.log(abilityObj.ability.name);
      });
    });//End callPoke

  });//End Module
