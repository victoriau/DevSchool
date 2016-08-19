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

    //type Effectiveness category
    if($scope.category === 0){
      $scope.question = "";
      var tempAnswers = [];
      $scope.categoryName = "Type Effectiveness"
      PokeFactory.callPoke('getEffectiveness').then(function(results){
      $scope.answers = [];
      //var name = results.chain.species.name;
      var damageLevelCase = Math.floor(Math.random() *3)+1;
      var damageLevel;

      switch(damageLevelCase) {
          case 1:
              var damageLevel = "half_damage_to";


              $scope.question = results.name.charAt(0).toUpperCase() + results.name.slice(1) + " types inflict half damage on _____ types";
              var answersArray = results.damage_relations.half_damage_to;
              console.log("length" + answersArray.length);
              if (answersArray.length == 0) {
                $scope.correctAnswer = "none";
              } else {
                $scope.correctAnswer = results.damage_relations.half_damage_to[0].name;
              }
              console.log(damageLevel);
              console.log("1");
              break;
          case 2:
              console.log("2");
              var damageLevel = "double_damage_to";
              //$scope.question = results.name + " types inflict double damage on _____ types";
              $scope.question = results.name.charAt(0).toUpperCase() + results.name.slice(1) + " types inflict double damage on _____ types";

              var answersArray = results.damage_relations.double_damage_to;
                            console.log("length" + answersArray.length);
              if (answersArray.length == 0) {
                $scope.correctAnswer = "none";
              } else {
                $scope.correctAnswer = results.damage_relations.double_damage_to[0].name;
              }
              console.log(damageLevel);
              break;
          case 3:
              console.log("3");
              var damageLevel = "no_damage_to";
              $scope.question = results.name.charAt(0).toUpperCase() + results.name.slice(1) + " types inflict no damage on _____ types";

              var answersArray = results.damage_relations.no_damage_to;
                            console.log("length" + answersArray.length);
              if (answersArray.length == 0) {
                $scope.correctAnswer = "none";
              } else {
                $scope.correctAnswer = results.damage_relations.no_damage_to[0].name;
              }
              console.log(damageLevel);
              break;

          default:
              console.log("default");
      }

      //$scope.question = results.name + " evolves to _____";
      console.log(results);

      //  $scope.correctAnswer = results.name;

        tempAnswers.push($scope.correctAnswer);
                          console.log("correct answer" + tempAnswers[0]);

        while(tempAnswers.length < 4){
                 var num = Math.floor(Math.random() * 18);
                 var good = true;

                 for(var i = 0; i < tempAnswers.length; i++){
                   if(tempAnswers[i] === $scope.allTypes[num].name){
                     good = false;
                   }
                 }
                 console.log(answersArray);
                 for(var j = 0; j < answersArray.length; j++){
                   if($scope.allTypes[num].name === answersArray[j].name){
                     good = false;
                   }
                 }
                 if(good){
                   tempAnswers.push($scope.allTypes[num].name);
                 }
               }
        $scope.answers = $scope.shuffleArray(tempAnswers);

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
