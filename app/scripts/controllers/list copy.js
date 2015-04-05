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
    .directive('listWrapper', [ function() {

        function link(scope, element) {
 
            var paneScrollTop,
                paneScrollLeft,
                paneVisibleHeight,
                paneVisibleWidth,
                paneFullHeight,
                paneFullWidth,
                paneScrollBottom,
                paneScrollRight;

            function initList(){
	            
	            // REPLACE THIS WITH AJAX METHOD, PULL EXISTING DATA FROM FILE HANDLER
				// This is the starting value for the editor
				// We will use this to seed the initial editor 
				// and to provide a "Restore to Default" button.
				var starting_value = [
				{
				  name: "John Smith",
				  age: 35,
				  gender: "male",
				  location: {
				    city: "San Francisco",
				    state: "California",
				    citystate: ""
				  },
				  pets: [
				    {
				      name: "Spot",
				      type: "dog",
				      fixed: true
				    },
				    {
				      name: "Whiskers",
				      type: "cat",
				      fixed: false
				    }
				  ]
				}
				];
				
				// Initialize the editor
				var editor = new JSONEditor(document.getElementById('editor_holder'),{
				// Enable fetching schemas via ajax
				ajax: true,
				
				// The schema for the editor
				schema: {
				  type: "array",
				  title: "People",
				  format: "tabs",
				  items: {
				    title: "Person",
				    headerTemplate: "{{i}} - {{self.name}}",
				    oneOf: [
				      {
				        $ref: "data/basic_person.json",
				        title: "Basic Person"
				      },
				      {
				        $ref: "data/person.json",
				        title: "Complex Person"
				      }
				    ]
				  }
				},
				
				// Seed the form with a starting value
				startval: starting_value,
				
				// Disable additional properties
				no_additional_properties: true,
				
				// Require all properties by default
				required_by_default: true
				});
				
				// Hook up the submit button to log to the console
				//document.getElementById('submit').addEventListener('click',function() {
				// Get the value from the editor
				//console.log(editor.getValue());
				//});
				
				// Hook up the Restore to Default button
				document.getElementById('restore').addEventListener('click',function() {
				editor.setValue(starting_value);
				});
				
				// Hook up the enable/disable button
				document.getElementById('enable_disable').addEventListener('click',function() {
				// Enable form
				if(!editor.isEnabled()) {
				  editor.enable();
				}
				// Disable form
				else {
				  editor.disable();
				}
				});
				
				// Hook up the validation indicator to update its 
				// status whenever the editor changes
				editor.on('change',function() {
				// Get an array of errors from the validator
				var errors = editor.validate();
				
				var indicator = document.getElementById('valid_indicator');
				
				// Not valid
				if(errors.length) {
				  indicator.style.color = 'red';
				  indicator.textContent = "not valid";
				}
				// Valid
				else {
				  indicator.style.color = 'green';
				  indicator.textContent = "valid";
				}
				});
				
				// Hook up the submit button to save JSON
				document.getElementById('submit').addEventListener('click',function() {
					// Get the value from the editor
					// Ajax post json to PHP file handler
				});
				
			}
            initList();
        }
        return {
            restrict: 'A',
            link: link
        };
    }]);