'use strict';

//MAUI API factory used for managing API calls
angular.module('pokExamApp').factory('PokeFactory', function($http, $q){
    var service = {};
    var baseUrl = 'http://pokeapi.co/api/v2/';

    var _session = '';
    var _department = '';
    var _courseidentifier = '';
    var _finalUrl;

    var makeUrl = function(intent){
        var urlAddition = '';
        switch(intent) {
            case 'catalogCourse':
                urlAddition = 'catalog/' + _session + '/' + _department;
                break;
            case 'courseByIdentifier':
                urlAddition = 'course/' + _courseidentifier;
                break;
            case 'getRandomPoke':
              var num = Math.floor(Math.random() *150) + 1;
              urlAddition = 'pokemon/' + num + '/';
              break;
            case 'getRandomPokeMin':
                var num = Math.floor(Math.random() *150) + 1;
                urlAddition = 'pokemon-species/' + num + '/';
                break;
            default:
                return 'error';
        }
        _finalUrl = baseUrl + urlAddition;
    };

    //setter methods for private variables
    service.setSession = function(session){
        _session = session;
    };
    service.setDepartment = function(department){
        _department = department.toUpperCase();
    };
    service.setCourseIdentifier = function(courseidentifier){
        _courseidentifier = courseidentifier.toUpperCase();
    };

    //getter methods for private variables
    service.getSession = function(){
        return _session;
    };
    service.getDepartment = function(){
        return _department;
    };
    service.getCourseIdentifier = function(){
        return _courseidentifier;
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
