'use strict';

/**
 * @ngdoc function
 * @name scorecardApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the scorecardApp
 */
angular.module('scorecardApp')
	.controller('ListCtrl', ['$scope', '$http',
	function ($scope, $http) {
		
		var dbJson = 'data/db_stg.json';
		
	    $http.get(dbJson).success(function(data) {
	        // Return Table Data
	        $scope.table = data;
	    });
	}])
