(function ()
{
    'use strict';

    angular
        .module('app.department', [])
        .config(config).run(runBlock);

    /** @ngInject */
    function config($stateProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.department', {
            url      : '/department/{deptId}',
            views    : {
                'content@app': {
                    templateUrl: 'static/app/main/department/department.html',
                    controller : 'DepartmentController as vm'
                }
            },
            resolve  : {
                DepartmentData: function ($stateParams, msApi)
                {
                      msApi.resolve('app.department@get', {id : $stateParams.deptId});
                },
            },
            bodyClass: 'app-department'
        });

        // Api
        msApiProvider.register('app.department', ['api/v1/department/:id']);
    }

    /** @ngInject */
    function runBlock(djangoAuth, msNavigationService) {
      console.log('runnin', djangoAuth.profile());
      // Navigation
      msNavigationService.saveItem('department', {
          title: 'Explore',
          icon  : 'icon-tile-four',
          state: 'app.department',
          weight: 1
      });

    }

})();
