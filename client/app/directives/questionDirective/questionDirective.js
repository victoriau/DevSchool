'use strict';

angular.module('pokExamApp')
  .directive('questionDirective', [function(){
    return {
      restrict: 'EA',
      templateUrl: 'app/directives/questionDirective/questionDirective.html',
      scope: {},
      controller: ['$scope', function($scope){
        console.log("Connecting to the directive");
      }],
      link: function(){}
    }; //end of return statement

  }]); //end directive
