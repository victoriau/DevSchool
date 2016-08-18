'use strict';

//MAUI API factory used for managing API calls
angular.module('pokExamApp').factory('MusicFactory', function($http, $q){
    var service = {};

    service.playMainMusic = function(intent){
        var audio = new Audio('../../assets/music/palette_town_theme.mp3').play();
    };

    return service;
});
