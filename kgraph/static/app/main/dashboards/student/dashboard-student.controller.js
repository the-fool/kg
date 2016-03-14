(function() 
{
	'use strict';

	angular
		.module('app.dashboards.student')
		.controller('DashboardStudentController', DashboardStudentController);

	/** @ngInject */
	function DashboardStudentController($scope, DashboardData) {
		var vm = this;

		vm.welcomeText = "welcome to student";
	}
})();	