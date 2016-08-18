'use strict';

angular.module('pokExamApp')
  .directive('scoreDirective', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/directives/scoreDirective/scoreDirective.html',
      scope: {},
      controller: ['$scope', function($scope){
        console.log("Connecting to the directive");
      }],
      link: function(){}
    }; //end of return statement

  }]); //end directive
