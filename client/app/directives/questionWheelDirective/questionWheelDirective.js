'use strict';

angular.module('pokExamApp')
  .directive('questionWheelDirective', [function() {
    return {
      restrict: 'EA',
      templateUrl: 'app/directives/questionWheelDirective/questionWheelDirective.html',
      scope: {},

      controller: ['$scope', '$uibModal', 'PokeFactory', 'MusicFactory', function($scope, $uibModal, PokeFactory, MusicFactory) {
        PokeFactory.callPoke('allPokemon').then(function(results){
          $scope.allPokemon = results.results;
          //console.log($scope.allPokemon);

        });

        PokeFactory.callPoke('allTypes').then(function(results){
          $scope.allTypes = results.results;
          console.log("types");
          console.log($scope.allTypes);
        });

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

        MusicFactory.playMainMusic();

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
                    MusicFactory.playBattleMusic();
                    $scope.category = this.x;
                    $scope.difficulty = this.series.name;
                    $scope.clickedPiece = this;
                    $scope.index = this.index;
                    console.log('Category: ' + this.x + ' Difficulty: ' + this.series.name);
                    var modalInstance = $uibModal.open({
                      animation: true,
                      templateUrl: 'app/modals/questionModal.html',
                      controller: 'questionModalCtrl',
                      size: 'lg',
                      scope: $scope,
                      resolve: {}
                    });

                    var disablePiece = function(color) {
                        var piece = $scope.clickedPiece.series.data[$scope.index];
                        console.log(piece);
                        piece.color = color;
                        piece.events.click = function() {
                            console.log("Test");
                            return false;
                        };
                        $scope.clickedPiece.series.setData($scope.clickedPiece.series.data,true); //SET DATA TO ITSELF TO RERENDER
                    }
                    modalInstance.result.then(function (correct) {
                        console.log("User answered correctly? " + correct);
                        if (!correct) {
                            //send message to lives directive to decrement lives
                        } else {
                            switch ($scope.category, $scope.difficulty) {
                                case 180, "Easy":
                                    disablePiece(answered[2]);
                                    break;
                                case 180, "Medium":
                                    disablePiece(answered[1]);
                                    break;
                                case 180, "Hard":
                                    disablePiece(answered[1]);
                                    break;
                                default:
                                    console.log($scope.category, $scope.difficulty);
                            }
                        }
                    }, function () {
                      console.log("Modal dismissed");
                    });
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
