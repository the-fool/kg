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
                Profile: function(djangoAuth, $state, $rootScope)
                {
                  return djangoAuth
                    .authenticationStatus(true, false)
                    .then(
                      function() {
                        // successfully logged in -- return user object
                        return djangoAuth.profile().then(function(data) {return data;});
                      },
                      function(error) {
                        console.log(error)
                        $state.go('app.pages_auth_login');
                      }
                    );
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
