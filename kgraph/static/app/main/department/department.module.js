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
                'DepartmentDetailData': function ($stateParams, msApi)
                {
                    return msApi.resolve('app.department@get', {id : $stateParams.deptId});
                },
                'DepartmentCoursesData': function ($stateParams, msApi)
                {
                    return msApi.resolve('app.department-courses@get', {id : $stateParams.deptId});
                }
            },
            bodyClass: 'app-department'
        });

        // Api
        msApiProvider.register('app.department', ['api/v1/department/:id/']);
        msApiProvider.register('app.department-courses', ['api/v1/department/:id/courses/']);
    }

    /** @ngInject */
    function runBlock(djangoAuth, msNavigationService) {


      /** Set the appropriate department affiliations in quick-nav for a user */
      djangoAuth.authenticationStatus()
        .then(
          function(data) {
            // if data is undefined, then no user is authenticated
            if (data !== undefined) {
              // Add user's personal affiliations to navigation
              var affiliations = data.affiliations ? data.affiliations : [];
              msNavigationService.saveItem('affiliations', {
                title : 'MY SCHOOLS',
                icon  : 'icon-tile-four',
                weight: 1
              });

              affiliations.forEach(function(element, index) {
                  msNavigationService.saveItem('affiliations.department-' + index, {
                      title: element.title,
                      state: 'app.department',
                      weight: 1,
                      stateParams: {deptId: element.id},
                  });
              });
            }
          },
          function(error) {
            console.log(error);
          }
        );


    }

})();
