'use strict';

/**
 * @ngdoc function
 * @name scorecardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the scorecardApp
 */
angular.module('scorecardApp')
	.controller('ReportsHighlightsCtrl', ['$scope', '$http', 'txtFile',
	function ($scope, $http, txtFile) {
	    $http.get(txtFile.txtFileUrl).success(function(data) {
			$scope.highlightsTxt = data.split('\n');
	    });
    }]);
