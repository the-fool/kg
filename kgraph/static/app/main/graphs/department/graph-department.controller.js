(function()
{
	'use strict';

	angular
		.module('app.graphs.department')
		.controller('GraphDepartmentController', GraphDepartmentController);

	/** @ngInject */
	function GraphDepartmentController($scope, DepartmentData) {
		var vm = this;

		vm.welcomeText = "welcome to department graph";
		vm.data = [10,20,30,40,60, 80, 20, 50];

	}
})();
