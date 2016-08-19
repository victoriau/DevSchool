'use strict';

//MAUI API factory used for managing API calls
angular.module('pokExamApp').factory('PokeFactory', function($http, $q){
    var service = {};
    var baseUrl = 'http://pokeapi.kevgriffin.com/api/v2/';

    var _offset = '';
    var _finalUrl;

    var makeUrl = function(intent){
        var urlAddition = '';
        switch(intent) {
            case 'getRandomPoke':
              var num = Math.floor(Math.random() *150) + 1;
              urlAddition = 'pokemon/' + num + '/';
              break;
            case 'getRandomPokeMin':
                var num = Math.floor(Math.random() *150) + 1;
                urlAddition = 'pokemon-species/' + num + '/';
                break;
            case 'getEvolution':
                var num = Math.floor(Math.random() *150) + 1;
                urlAddition = 'evolution-chain/' + num + '/';
                break;
            case 'allPokemon':
                urlAddition = 'pokemon/?limit=811';
                break;
            case 'getOffset':
                urlAddition = 'pokemon/?offset=' + _offset;
                break;
            case 'getEffectiveness':
                var num = Math.floor(Math.random() * 18)+1;
                urlAddition = 'type/' + num + '/';
                break;
            case 'allTypes':
                urlAddition = 'type/';
                break;
            case 'getMove':
                var num = Math.floor(Math.random() * 500) + 1;
                urlAddition = 'move/' + num + '/';
                break;
            case 'allItems':
                urlAddition = 'item/?limit=746';
                break;
            case 'getItem':
                var num = Math.floor(Math.random() * 745) + 1;
                urlAddition = 'item/' + num + '/';
                break;
            default:
                return 'error';
        }
        _finalUrl = baseUrl + urlAddition;
    };

    //setter methods for private variables
    service.setOffset = function(offset){
        _offset = offset;
    };

    service.callPoke = function(intent){
        makeUrl(intent);
        var deferred = $q.defer();

        $http.get(_finalUrl, {
          headers: {
            'Content-type': 'application/json'
          }
        }).success(function(data){
            deferred.resolve(data);
        }).error(function(){
            deferred.reject('There was an error');
        });
        return deferred.promise;
    };

    return service;
});
