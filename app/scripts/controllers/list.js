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
		
		var dbStg = 'data/db_stg.json';
		var dbSchema = 'data/db_schema.json';
		
	    $http.get(dbSchema).success(function(data) {
	        // Return DB schema
	        $scope.schema = data;
	    });
	    
	    $http.get(dbStg).success(function(data) {
	        // Return Staging DB
	        $scope.db = data;
			
			$scope.addObject = function(model) {
				// Define objects if undefined
				if( $scope.db[model] === undefined ){
					$scope.db = {};
					if( $scope.db[model] === undefined ){
						$scope.db[model] = {};
					}
				}
				var objects = $scope.db[model];
				var fields = $scope.schema.objects[model].fields;
				var scaffold = {};
				for( var i=0; i<fields.length; i++ ){
					scaffold[fields[i].name] = null;
				}
				objects[objects.length] = scaffold;
				console.log($scope);
			}
		
	    });
	    
	    $scope.saveDB = function(){
			
			var jsonData = $scope.db;
			jsonData.mode = "update";
			
			$.ajax({
		        type: "GET",
		        url: "http://jtd.co/shortstack/dbtest.php",
		        data: jsonData,
		        contentType: "text/json; charset=utf-8",
		        dataType: "json",
		        success: function(data){console.log(data);},
		        failure: function(errMsg) {
		            alert(errMsg);
		        }
			});
			
	    }

	}]);
