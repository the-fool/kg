(function ()
{
    'use strict';

    angular
        .module('app.department', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.department', {
            url      : '/department',
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

        // Navigation
        msNavigationServiceProvider.saveItem('department', {
            title: 'Explore',
            icon  : 'icon-tile-four',
            state: 'app.department',
            weight: 1
        });

        // Api
        msApiProvider.register('app.department', ['api/v1/department/']);
    }

})();
