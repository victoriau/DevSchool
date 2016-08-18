'use strict';

angular.module('pokExamApp')
  .controller('MainCtrl', function ($scope, $http, $uibModal, PokeFactory) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.test = "Victoria";


  });//End Module
