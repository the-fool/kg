(function()
{
	'use strict';

	angular
		.module('app.dashboards.student')
		.controller('DashboardStudentController', DashboardStudentController);

	/** @ngInject */
	function DashboardStudentController($rootScope, DashboardData, Profile) {
		var vm = this;
		console.log(Profile);
		vm.profile = Profile;
		vm.welcomeText = "welcome " + vm.profile.username;
	}
})();
