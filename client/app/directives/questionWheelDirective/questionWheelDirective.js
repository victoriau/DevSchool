'use strict';

angular.module('pokExamApp')
  .directive('questionWheelDirective', [function() {
    return {
      restrict: 'EA',
      templateUrl: 'app/directives/questionWheelDirective/questionWheelDirective.html',
      scope: {},
      controller: ['$scope', function($scope) {
        console.log("Connecting to the question wheel directive");
        $('#container').highcharts({

          chart: {
            polar: true
          },

          legend: {
            enabled: false
          },

          title: {
            text: 'Pok\xE9Trivia'
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
            },
            column: {
              pointPadding: 0,
              groupPadding: 0,
            }
          },
          tooltip: {
            formatter: function() {
              return 'Category: <b>' + this.x + '</b><br/>Difficulty: <b>' + this.series.name + '</b>';
            }
          },
          series: [{
            type: 'column',
            name: 'Hard',
            data: [{
              y: 1,
              color: reds[2]
            }, {
              y: 1,
              color: browns[2]
            }, {
              y: 1,
              color: yellows[2]
            }, {
              y: 1,
              color: purples[2]
            }, {
              y: 1,
              color: blues[2]
            }, {
              y: 1,
              color: teals[2]
            }, {
              y: 1,
              color: greens[2]
            }, {
              y: 1,
              color: grays[2]
            }, ],
            pointPlacement: 'between'
          }, {
            round: 1,
            type: 'column',
            name: 'Medium',
            data: [{
              y: 1,
              color: reds[1]
            }, {
              y: 1,
              color: browns[1]
            }, {
              y: 1,
              color: yellows[1]
            }, {
              y: 1,
              color: purples[1]
            }, {
              y: 1,
              color: blues[1]
            }, {
              y: 1,
              color: teals[1]
            }, {
              y: 1,
              color: greens[1]
            }, {
              y: 1,
              color: grays[1]
            }, ],
            pointPlacement: 'between'
          }, {
            round: 0,
            type: 'column',
            name: 'Easy',
            data: [{
              y: 1,
              color: reds[0]
            }, {
              y: 1,
              color: browns[0]
            }, {
              y: 1,
              color: yellows[0]
            }, {
              y: 1,
              color: purples[0]
            }, {
              y: 1,
              color: blues[0]
            }, {
              y: 1,
              color: teals[0]
            }, {
              y: 1,
              color: greens[0]
            }, {
              y: 1,
              color: grays[0]
            }, ],
            pointPlacement: 'between'
          }]
        });
      }],
      link: function() {}
    }; //end of return statement
  }]); //end directive
