'use strict';

angular.module('pokExamApp').controller('questionModalCtrl', ['$http', '$scope', '$uibModalInstance',
'PokeFactory', function ($http, $scope, $uibModalInstance, PokeFactory) {

    $scope.user = "Victoria";
    $scope.answer;

    $scope.ok = function (answer) {
      console.log(answer);
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.question = "";
    $scope.answers = [];

    if($scope.category === 315){
      $scope.question = "Which pokemon is this?";
      $scope.answers = [];
      PokeFactory.callPoke('getRandomPoke').then(function(results){
        $scope.answers.push(results.name);
        $scope.sprite = results.sprites.front_default;
      });//End callPoke
      PokeFactory.callPoke('getRandomPokeMin').then(function(results){
        $scope.answers.push(results.names[0].name);
      });//End callPoke
      PokeFactory.callPoke('getRandomPokeMin').then(function(results){
        $scope.answers.push(results.names[0].name);
            });//End callPoke
      PokeFactory.callPoke('getRandomPokeMin').then(function(results){
        console.log(results);
        $scope.answers.push(results.names[0].name);
      });//End callPoke

    }

  }
]);
