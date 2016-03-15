(function()
{
	'use strict';

	angular
		.module('app.dashboards.student')
		.controller('DashboardStudentController', DashboardStudentController);

	/** @ngInject */
	function DashboardStudentController($scope, DashboardData, Profile, djangoAuth) {
		var vm = this;
		vm.profile = Profile;
		vm.welcomeText = "welcome to student";
	}
})();
