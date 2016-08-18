'use strict';

angular.module('pokExamApp')
  .controller('MainCtrl', function ($scope, $http, $uibModal, PokeFactory) {
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

    $scope.askQuestion = function (size) {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/modals/questionModal.html',
        controller: 'questionModalCtrl',
        size: size,
        scope: $scope,
        resolve: {}
      });

      modalInstance.result.then(function (plan) {
      }, function () {
        console.log("Modal dismissed");
      });

    };

  });//End Module
