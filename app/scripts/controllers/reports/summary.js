'use strict';

/**
 * @ngdoc function
 * @name scorecardApp.controller:ReportsSummaryCtrl
 * @description
 * # ReportsSummaryCtrl
 * Controller of the scorecardApp
 */
angular.module('scorecardApp')
	.controller('ReportsSummaryCtrl', ['$scope', '$http', 'jsonFile',
	function ($scope, $http, jsonFile) {
	    $http.get(jsonFile.jsonFileUrl).success(function(data) {
	        // Return Table Data
	        $scope.table = data;
	        // Sort rows by rank
	        // Loop through segments
	        for ( var w = 0; w < data['Consumer Segment'].length; w++ ){
		        var segment = data['Consumer Segment'][w];
		        var rows = [], keys = [];
		        // Loop through rows to get ranks
		        for ( var x = 0; x < segment.row_data.length; x++ ){
			        keys[x] = segment.row_data[x].index;
		        }
		        // Sort the ranks
		        keys.sort(function(a, b){return a-b});
		        // Loop through sorted keys
		        for ( var y = 0; y < keys.length; y++ ){
			        // For each row loop through once more to find rows with matching fields
			        for ( var z = 0; z < segment.row_data.length; z++ ){
				        // Check if this row[z]'s rank matches key[y]
				        if ( segment.row_data[z].rank === keys[y] ){
					        rows[y] = segment.row_data[z];
				        }
			        }
		        }
		        // Hand sorted rows back to the data objectj 
		        data['Consumer Segment'][w].row_data = rows;
	        }
			// Track current segment
	        $scope.current_segment = data['Consumer Segment'][0];
	    });
	}]);
