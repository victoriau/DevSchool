'use strict';

angular.module('pokExamApp')
  .directive('questionWheelDirective', [function() {
    return {
      restrict: 'EA',
      templateUrl: 'app/directives/questionWheelDirective/questionWheelDirective.html',
      scope: {
        correct: "="
      },

      controller: ['$scope', '$uibModal', 'PokeFactory', 'MusicFactory', function($scope, $uibModal, PokeFactory, MusicFactory) {
        $scope.alive = [true, true, true, true, true, true];
        $scope.showX = false;
        $scope.numLives = 0;
        PokeFactory.callPoke('allPokemon').then(function(results) {
          $scope.allPokemon = results.results;
          //console.log($scope.allPokemon);
        });

        PokeFactory.callPoke('allTypes').then(function(results){
          $scope.allTypes = results.results;
          console.log("types");
          console.log($scope.allTypes);
        });

        PokeFactory.callPoke('allItems').then(function(results){
          $scope.allItems= results.results;
          console.log($scope.allItems);
        });


        $scope.checkLives = function(correct){
          $scope.alive[$scope.numIncorrect] = correct;
          if(!correct){
            console.log($scope.numIncorrect);
            if($scope.numIncorrect === 5){
              $scope.loser();
            }
            else{
              $scope.numIncorrect += 1;
            }
          }
        }

        $scope.loser = function(){
          console.log('opening pop up');
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/loserModal/loserModal.html',
            controller: 'loserModalCtrl',
            size: 'lg',
            scope: $scope,
            resolve: {}
          });
        }

        $scope.winner = function(){
          console.log('opening pop up');
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/modals/winnerModal/winnerModal.html',
            controller: 'winnerModalCtrl',
            size: 'lg',
            scope: $scope,
            resolve: {}
          });
        }



        function getCategory(x) {
          switch (x) {
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

        $scope.chart = Highcharts.chart({

            credits: {
              enabled: false
            },

            chart: {
              renderTo: 'container',
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
                        piece.color = color;
                        piece.fill = color;
                        piece.options.color = color;
                        piece.floodColor = color;
                        $scope.chart.series[0].data[$scope.index].graphic.attr({
                          fill: "red"
                        });

                        $scope.chart.redraw();

                        var successes = [];
                        //setup successes
                        for (var s in $scope.chart.series) {
                          var tempArray = [];
                          for (var i in $scope.chart.series[s].data) {
                            tempArray.push(false);
                          }
                          successes.push(tempArray);
                        }

                        //populate successes
                        for (var s in $scope.chart.series) {
                          var tempArray = [];
                          for (var i in $scope.chart.series[s].data) {
                            if (answered.indexOf($scope.chart.series[s].data[i].color) != -1 ){
                              console.log("Win at (" + s + "," + i + ")");
                              successes[s][i] = true;
                            }
                          }
                        }

                        //Check for wins from inside out
                        var wonGame = true;
                        for (var i in $scope.chart.series[0].data) {
                          var columnWon = true;
                          for (var s in $scope.chart.series) {
                            if (successes[s][i] === false) {
                              columnWon = false;
                              wonGame = false;
                            }
                          }
                          if (columnWon) {
                            //WON COLUMN I
                            console.log("Won column: " + i);
                          }
                        }
                        if (wonGame) {
                          //WON GAME
                          console.log("Won game!!!!");
                          $scope.winner();
                        }
                      }
                      modalInstance.result.then(function(correct) {
                        $scope.checkLives(correct);
                        console.log("User answered correctly? " + correct);
                        if (!correct) {
                          MusicFactory.playFailureSound();

                          $scope.showX = true;
                          setTimeout(function(){
                              $scope.showX = false;
                          }, 700);

                          //send message to lives directive to decrement lives
                        } else {
                          MusicFactory.playSuccessSound();

                          $scope.showCheck = true;
                          setTimeout(function(){
                              $scope.showCheck = false;
                          }, 700);

                          console.log($scope.category, $scope.difficulty);
                          switch ($scope.difficulty) {
                            case "Easy":
                              disablePiece(answered[2]);
                              break;
                            default:
                              switch ($scope.category) {
                                case 0:
                                case 45:
                                case 270:
                                case 315:
                                  disablePiece(answered[0]);
                                  break;
                                case 90:
                                case 135:
                                case 180:
                                case 225:
                                  disablePiece(answered[1]);
                                  break;
                                default:
                                  console.log("no");
                              }
                          }
                        }
                      })

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
