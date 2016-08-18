'use strict';

angular.module('pokExamApp').controller('questionModalCtrl', ['$http', '$scope', '$uibModalInstance',
'PokeFactory', function ($http, $scope, $uibModalInstance, PokeFactory) {

    $scope.user = "Victoria";
    $scope.answer;
    $scope.correctAnswer;

    $scope.ok = function (answer) {
      console.log("Selected: " + answer + "; Correct = " + $scope.correctAnswer);;
      $uibModalInstance.close(answer === $scope.correctAnswer);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.question = "";
    $scope.answers = [];

    //Who's that Pokemon Questions
    if($scope.category === 180){
      $scope.question = "Who's this Pokemon?";
      var tempAnswers = [];
      PokeFactory.callPoke('getRandomPoke').then(function(results){
        tempAnswers.push(results.name);

        $scope.correctAnswer = results.name;

        $scope.sprite = results.sprites.front_default;

        var num = Math.floor(Math.random() *811);
        tempAnswers.push($scope.allPokemon[num].name);
        var num = Math.floor(Math.random() *811);
        tempAnswers.push($scope.allPokemon[num].name);
        var num = Math.floor(Math.random() *811);
        tempAnswers.push($scope.allPokemon[num].name);

        $scope.answers = $scope.shuffleArray(tempAnswers);
      });//End callPoke
    }//End question type

    //Evolution Question
    if($scope.category === 45){
      var tempAnswers = [];
      $scope.question = "";
      $scope.answers = [];
      PokeFactory.callPoke('getEvolution').then(function(results){
        var name = results.chain.species.name;
        $scope.question = results.chain.species.name.charAt(0).toUpperCase() + results.chain.species.name.slice(1) + " evolves to _____";
        console.log(results);

        if(results.chain.evolves_to.length === 0){
          var num = Math.floor(Math.random() *811);
          tempAnswers.push($scope.allPokemon[num].name);
        }else{
          console.log(results.chain.evolves_to[0].species.name);
          tempAnswers.push(results.chain.evolves_to[0].species.name);
        }

        var num = Math.floor(Math.random() *811);
        tempAnswers.push($scope.allPokemon[num].name);
        var num = Math.floor(Math.random() *811);
        tempAnswers.push($scope.allPokemon[num].name);

        $scope.answers = $scope.shuffleArray(tempAnswers);
        $scope.answers.push("This pokemon does not evolve");
      });//End callPoke
    }//End question type

    $scope.shuffleArray = function(tempAnswers){
      var array = tempAnswers;
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    };

  }
]);
