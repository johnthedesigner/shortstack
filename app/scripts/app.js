'use strict';

/**
 * @ngdoc overview
 * @name scorecardApp
 * @description
 * # scorecardApp
 *
 * Main module of the application.
 */
angular
    .module('scorecardApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'chart.js'
    ])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {redirectTo: '/list'})
/*        .when('/list', {
            templateUrl: 'views/list.html',
            controller: 'ListCtrl',
            resolve: {
	            jsonFile: function(){
		            return {
			            jsonFileUrl: 'data/db_stg.json'
			        };
		        }
	        }
        })*/
        .when('/list', {
          templateUrl: 'views/list.html',
          controller: 'ListCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    });