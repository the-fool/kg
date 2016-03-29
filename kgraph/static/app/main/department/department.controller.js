(function()
{
	'use strict';

	angular
		.module('app.department')
		.controller('DepartmentController', DepartmentController);

	/** @ngInject */
	function DepartmentController($stateParams, $mdSidenav, $rootScope, DepartmentDetailData, DepartmentCoursesData) {
		var vm = this;

		vm.department = DepartmentDetailData;
		vm.graphData = wrangleCourseData(DepartmentCoursesData.results);

		vm.openQuickPanel = openQuickPanel;

		/**
		 *  Open quick panel for course info
		 *
		 */

		function openQuickPanel(nodeID) {
			$rootScope.$broadcast('course-selected', nodeID);
			$mdSidenav('quick-panel').toggle();
		}

		/* Convert result from API call into D3 friendly format */
		function wrangleCourseData(apiData) {
			// list of course objects
			var data = apiData;
			var ret  = {nodes:[], edges:[]};

			data.forEach(function(node) {
				ret.nodes.push({
						id : node.id,
						label : node.title
				});

				if (node.aft.length > 0) {
					// aft is an array of edges
					node.aft.forEach(function(aft) {
						// aft.whence == a node id
						ret.edges.push({
							from  : aft.whence,
							to    : aft.whither,
							label : aft.whence + "_" + aft.whither
						});
					});
				}
			});
		  return ret;
		}
	}
})();
