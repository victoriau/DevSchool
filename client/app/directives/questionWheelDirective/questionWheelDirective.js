'use strict';

angular.module('pokExamApp')
  .directive('questionWheelDirective', [function() {
    return {
      restrict: 'EA',
      templateUrl: 'app/directives/questionWheelDirective/questionWheelDirective.html',
      scope: {},
      controller: ['$scope', function($scope) {
          
          function getCategory(x) {
              switch(x) {
                  case 0:
                      return 'Type Effectiveness';
                  case 45:
                      return 'Evolution';
                  case 90:
                      return 'Moves';
                  case 135:
                      return 'Pok\xE9mon Stats';
                  case 180:
                      return 'Who\'s That Pok\xE9mon?';
                  case 225:
                      return 'Items';
                  case 270:
                      return 'Badges';
                  case 315:
                      return 'Miscellaneous';
                  default:
                      return 'Unown Category';
              }
          }
          
        console.log("Connecting to the question wheel directive");
        $('#container').highcharts({

          credits: {
            enabled: false
          },

          chart: {
            polar: true
          },

          legend: {
            enabled: false
          },

          title: {
            text: 'Pok\xE9Trivia',
            style: {
              display: 'none'
            }
          },

          pane: {
            startAngle: 0,
            endAngle: 360
          },

          xAxis: {
            tickInterval: 45,
            min: 0,
            max: 360,
            labels: {
              formatter: function() {
                return "";
              }
            }
          },

          yAxis: {
            min: 0,
            max: 3,
            labels: {
              formatter: function() {
                return "";
              }
            }
          },

          plotOptions: {
            series: {
              pointStart: 0,
              pointInterval: 45,
              stacking: 'normal',
              point: {
                events: {
                  click: function() {
                    console.log('Category: ' + this.x + ' Difficulty: ' + this.series.name);
                  }
                }
              },
              borderWidth: 1,
              borderColor: '#FFFFFF',
            },
            column: {
              pointPadding: 0,
              groupPadding: 0,
            }
          },
          tooltip: {
            formatter: function() {
              return 'Category: <b>' + getCategory(this.x) + '</b><br/>Difficulty: <b>' + this.series.name + '</b>';
            }
          },
          series: [{
            type: 'column',
            name: 'Hard',
            data: [{
              y: 1,
              color: unanswered[0]
            }, {
              y: 1,
              color: unanswered[0]
            }, {
              y: 1,
              color: unanswered[1]
            }, {
              y: 1,
              color: unanswered[1]
            }, {
              y: 1,
              color: unanswered[1]
            }, {
              y: 1,
              color: unanswered[1]
            }, {
              y: 1,
              color: unanswered[0]
            }, {
              y: 1,
              color: unanswered[0]
            }, ],
            pointPlacement: 'between'
          }, {
            round: 1,
            type: 'column',
            name: 'Medium',
            data: [{
              y: 1,
              color: unanswered[0]
            }, {
              y: 1,
              color: unanswered[0]
            }, {
              y: 1,
              color: unanswered[1]
            }, {
              y: 1,
              color: unanswered[1]
            }, {
              y: 1,
              color: unanswered[1]
            }, {
              y: 1,
              color: unanswered[1]
            }, {
              y: 1,
              color: unanswered[0]
            }, {
              y: 1,
              color: unanswered[0]
            }, ],
            pointPlacement: 'between'
          }, {
            round: 0,
            type: 'column',
            name: 'Easy',
            data: [{
              y: 1,
              color: unanswered[2]
            }, {
              y: 1,
              color: unanswered[2]
            }, {
              y: 1,
              color: unanswered[2]
            }, {
              y: 1,
              color: unanswered[2]
            }, {
              y: 1,
              color: unanswered[2]
            }, {
              y: 1,
              color: unanswered[2]
            }, {
              y: 1,
              color: unanswered[2]
            }, {
              y: 1,
              color: unanswered[2]
            }, ],
            pointPlacement: 'between'
          }]
        });
      }],
      link: function() {}
    }; //end of return statement
  }]); //end directive
