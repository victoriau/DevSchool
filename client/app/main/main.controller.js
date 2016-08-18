'use strict';

angular.module('pokExamApp')
  .controller('MainCtrl', function ($scope, $http, $uibModal, PokeFactory) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.test = "Victoria";
    $scope.maxLives = 6;
    $scope.lives = $scope.maxLives;
    console.log("Lives: " + $scope.lives);

  });//End Module
