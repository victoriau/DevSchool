'use strict';

//MAUI API factory used for managing API calls
angular.module('pokExamApp').factory('MusicFactory', function($http, $q) {
  var service = {};

  var mainMusic = document.getElementById("mainMusic");
  var battleMusic = document.getElementById("battleMusic");

  service.playMainMusic = function(intent) {
    battleMusic.pause();
    mainMusic.play();
  };
  service.playBattleMusic = function(intent) {
    mainMusic.pause();
    battleMusic.play();
  };
  return service;
});
