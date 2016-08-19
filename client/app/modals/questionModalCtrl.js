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

    //Moves Questions
    if($scope.category === 90){
      $scope.categoryName = "Moves"
      var moves = ["dark", "ice", "bug", "water", "normal", "ghost", "fighting", "ground", "grass", "psychic", "rock", "electric"];
      $scope.question = "What type of move is ";
      var tempAnswers = [];
      PokeFactory.callPoke('getMove').then(function(results){
        $scope.question = $scope.question + results.names[0].name + "?";
        tempAnswers.push(results.type.name);

        $scope.correctAnswer = results.type.name;

        while(tempAnswers.length < 4){
          var num = Math.floor(Math.random() * 12);
          var good = true;
          for(var i = 0; i < tempAnswers.length; i++){
            if(tempAnswers[i] === moves[num]){
              good = false;
            }
          }
          if(good){
            tempAnswers.push(moves[num]);
          }
        }
        $scope.answers = $scope.shuffleArray(tempAnswers);
      });//End callPoke
    }//End question type

    //Items Questions
    if($scope.category === 225){
      $scope.categoryName = "Which item is this?";
      $scope.question = "";
      var tempAnswers = [];
      PokeFactory.callPoke('getItem').then(function(results){
        $scope.sprite = results.sprites.default;
        $scope.correctAnswer = results.name;
        tempAnswers.push(results.name);
        while (tempAnswers.length < 4) {
            var otherBadge = Math.floor(Math.random() * 745);
            var dup = false;
            for(var i = 0; i< tempAnswers.length; i++){
                if(tempAnswers[i] === $scope.allItems[otherBadge].name){
                    dup = true;
                }
            }
            if (!dup) {
                tempAnswers.push($scope.allItems[otherBadge].name);
            }
        }
        $scope.answers = $scope.shuffleArray(tempAnswers);
      });

    }

    //Who's that Pokemon Questions
    if($scope.category === 180){
      $scope.categoryName = "Who's that Pokemon?";
      $scope.question = "";
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
      $scope.categoryName = "Evolution";
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
          $scope.correctAnswer = "This pokemon does not evolve";
        }else{
          console.log(results.chain.evolves_to[0].species.name);
          tempAnswers.push(results.chain.evolves_to[0].species.name);
          $scope.correctAnswer = results.chain.evolves_to[0].species.name;
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



    //Badges Question
    var badgearr = ["Boulder Badge", "Cascade Badge", "Thunder Badge", "Rainbow Badge", "Soul Badge", "Marsh Badge", "Volcano Badge", "Earth Badge"];
    var leaderarr = ["Brock", "Misty", "Lt. Surge", "Erika", "Koga", "Sabrina", "Blaine", "Giovanni"];

    if($scope.category === 270){
        $scope.categoryName = "Badges";
        var tempAnswers = [];
        $scope.question = "";
        $scope.answers = [];

        var gym = Math.floor(Math.random() * 8);

        $scope.question = leaderarr[gym] + " awards which badge?";

        tempAnswers.push(badgearr[gym]);
        $scope.correctAnswer = badgearr[gym];
        while (tempAnswers.length < 4) {
            var otherBadge = Math.floor(Math.random() * 8);
            var dup = false;
            for(var i = 0; i< tempAnswers.length; i++){
                if(tempAnswers[i] === badgearr[otherBadge]){
                    dup = true;
                }
            }
            if (otherBadge != gym && !dup) {
                tempAnswers.push(badgearr[otherBadge]);
            }
        }

        $scope.answers = $scope.shuffleArray(tempAnswers);
    }



  }
]);
