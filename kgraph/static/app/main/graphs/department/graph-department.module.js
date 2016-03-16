(function ()
{
    'use strict';

    angular
        .module('app.graphs.department', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider)
    {
        // State
        $stateProvider.state('app.graphs_department', {
            url      : '/graph-department',
            views    : {
                'content@app': {
                    templateUrl: 'static/app/main/graphs/department/graph-department.html',
                    controller : 'GraphDepartmentController as vm'
                }
            },
            resolve  : {
                DepartmentData: function (msApi)
                {
                    return msApi.resolve('graph.department@get');
                },
            },
            bodyClass: 'graph-department'
        });

        // Api
        msApiProvider.register('graph.department', ['api/v1/department/']);
    }

})();
