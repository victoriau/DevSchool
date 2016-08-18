'use strict';

angular.module('pokExamApp')
  .directive('pokeballLivesDirective', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/directives/pokeballLivesDirective/pokeballLivesDirective.html',
      scope: {},
      controller: ['$scope', function($scope){

        $scope.alive=true;

        console.log("Connecting to the pokeball lives directive");
      }],
      link: function(){}
    }; //end of return statement

  }]); //end directive
