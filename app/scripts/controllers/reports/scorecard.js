'use strict';

/**
 * @ngdoc function
 * @name scorecardApp.controller:ScorecardCtrl
 * @description
 * # ScorecardCtrl
 * Controller of the scorecardApp
 */
angular.module('scorecardApp')
	.controller('ReportsScorecardCtrl', ['$scope', '$http', 'jsonFile',
	function ($scope, $http, jsonFile) {
	    $http.get(jsonFile.jsonFileUrl).success(function(data) {
	        // Return Table Data
	        $scope.table = data;
	        // Display Scores
	        $scope.showScores = true;
	        // Return Number of Subsets
	        $scope.subsets = (function(){
	            var subsets = 0;
	            var sslength = data.superSubsets.length;
	            for( var x=0; x<sslength; x++ ){
	                var slength = data.superSubsets[x].subsets.length;
	                for ( var y=0; y<slength; y++ ){
	                    subsets++;
	                }
	            }
	            return subsets;
	        })();
	        // Return Number of Super Subsets
	        $scope.superSubsets = (function(){
	            var supersubsets = 1;
	            var sslength = data.superSubsets.length;
	            for( var x=0; x<sslength; x++ ){
	                supersubsets++;
	            }
	            return supersubsets;
	        })();
	        $scope.decimal_rounding = (function(value,places){
		        if ( !places ) places = 2;
		        var round_decimal = parseFloat(value).toFixed(places);
		        return round_decimal;
	        });
	        
	        // Sparklines
	        // How many months back should this data look?
	        var history = 6;
	        
	        // Process chart data
	        // Format months
	        function padMonth(num, size) {
			    var s = "0" + num;
			    return s.substr(s.length-size);
			}
			// Split data and labels
			function getChartData(rawData){
	            //var jsonData = JSON.parse(rawData);
	            var chart = [];
	            chart.labels = [];
	            chart.data = [];
	            for ( var i = 0; i < history; i++ ){
		            chart.labels[i] = padMonth( rawData[i][0][1], 2 );
		            chart.data[i] = rawData[i][1];
	            }
	            chart.labels.reverse();
	            chart.data.reverse();
	            return chart;
	        }
	        // Get Sparkline Data
	        var sslength = $scope.table.superSubsets.length;
	        for( var x=0; x<sslength; x++ ){
	            var slength = $scope.table.superSubsets[x].subsets.length;
	            for ( var y=0; y<slength; y++ ){
		            $scope.table.superSubsets[x].subsets[y].chartData = getChartData($scope.table.superSubsets[x].subsets[y].trend);
	                //console.log($scope.table.superSubsets[x].subsets[y].chartData);
	            }
	        }
	
	    });
	}])
	.controller('sparkLineCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
		var chartData = $scope.$parent.subset.chartData;
	    $scope.labels = chartData.labels;
	    $scope.data = [];
	    $scope.data[0] = chartData.data;
	    
	    Chart.defaults.global.colours[0].strokeColor = 'rgb(0, 191, 255)';
	}])
	.controller('boozBallCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
		var shareOfVoice = $scope.$parent.subset.doc_percentage.toFixed(4) * 100;
		var remaining = 100 - shareOfVoice;
		$scope.data = [shareOfVoice,remaining];
		$scope.labels = ['This Subset', 'Other Subsets'];
	}])
    .directive('scrollPaneHeaders', [ function() {

        function link(scope, element) {
            var paneScrollTop,
                paneScrollLeft,
                paneVisibleHeight,
                paneVisibleWidth,
                paneFullHeight,
                paneFullWidth,
                paneScrollBottom,
                paneScrollRight;

            function initScrollPanes(){
                // Get scroll Position
                paneScrollTop = element[0].scrollTop;
                paneScrollLeft = element[0].scrollLeft;
                paneVisibleHeight = element[0].clientHeight;
                paneVisibleWidth = element[0].clientWidth;
                paneFullHeight = element[0].scrollHeight;
                paneFullWidth = element[0].scrollWidth;
                paneScrollBottom = paneFullHeight-paneVisibleHeight-paneScrollTop;
                paneScrollRight = paneFullWidth-paneVisibleWidth-paneScrollLeft;
                
                // Keep header and sidebar in position
                document.getElementById('scorecard-grid-header').style.top = paneScrollTop+'px';
                document.getElementById('table-title').style.left = paneScrollLeft+'px';
                document.getElementById('scorecard-grid-sidebar').style.left = paneScrollLeft+'px';
                
                // Turn on shadows to imply scrollable content, turn off when end of scroll is reached
                if(paneScrollTop === 0){
                    document.getElementById('scroll-shadow-top').style.display = 'none';
                } else {
                    document.getElementById('scroll-shadow-top').style.display = 'block';
                }
                if(paneScrollLeft === 0){
                    document.getElementById('scroll-shadow-left').style.display = 'none';
                } else {
                    document.getElementById('scroll-shadow-left').style.display = 'block';
                }
                if(paneScrollBottom === 0){
                    document.getElementById('scroll-shadow-bottom').style.display = 'none';
                } else {
                    document.getElementById('scroll-shadow-bottom').style.display = 'block';
                }
                if(paneScrollRight === 0){
                    document.getElementById('scroll-shadow-right').style.display = 'none';
                } else {
                    document.getElementById('scroll-shadow-right').style.display = 'block';
                }
            }
            element[0].addEventListener('scroll', initScrollPanes);
        }
        return {
            restrict: 'A',
            link: link
        };
    }]);