(function ()
{
    'use strict';

    angular
        .module('app.dashboards.student', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider)
    {
        // State
        $stateProvider.state('app.dashboards_student', {
            url      : '/dashboard-student',
            views    : {
                'content@app': {
                    templateUrl: 'static/app/main/dashboards/student/dashboard-student.html',
                    controller : 'DashboardStudentController as vm'
                }
            },
            resolve  : {
                DashboardData: function (msApi)
                {
                    return msApi.resolve('dashboard.student@get');
                },
                Profile: function($q, djangoAuth)
                {
                  return djangoAuth
                    .authenticationStatus(false, true)
                    .then(function(data) {
                      console.log('resolved', data);
                      return data;
                    }, function() {
                      return undefined;
                    });
                },
            },
            bodyClass: 'dashboard-student'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('static/app/main/dashboards/student');

        // Api
        msApiProvider.register('dashboard.student', ['static/app/data/dashboards/student/data.json']);

    }

})();
