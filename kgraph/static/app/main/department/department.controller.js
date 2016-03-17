(function()
{
	'use strict';

	angular
		.module('app.department')
		.controller('DepartmentController', DepartmentController);

	/** @ngInject */
	function DepartmentController($stateParams, DepartmentDetailData, DepartmentCoursesData) {
		var vm = this;
		console.log($stateParams);
		console.log('detail', DepartmentDetailData);
		console.log('course', DepartmentCoursesData);
		vm.welcomeText = "welcome to department " + $stateParams.deptId;
		vm.data = [10,20,30,40,60, 80, 20, 50];

	}
})();
