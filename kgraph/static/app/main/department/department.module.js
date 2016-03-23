(function ()
{
    'use strict';

    angular
        .module('app.department', [])
        .config(config)
        .run(runBlock);

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
        msApiProvider.register('app.department', ['api/v1/departments/:id/']);
        msApiProvider.register('app.department-courses', ['api/v1/departments/:id/courses/']);
    }

    /** @ngInject */
    function runBlock(djangoAuth, msNavigationService, $rootScope) {
      // Affiliations must live beyond the execution time of this function
      var affiliations;

      msNavigationService.saveItem('affiliations', {
        title : 'MY SCHOOLS',
        icon  : 'icon-tile-four',
        weight: 1,
        hidden : function()
        {
          return djangoAuth.authenticated === null ? false : djangoAuth.authenticated;
        }
      });

      /* * * * * * * * * * * *
      /                                                                 /
      /  Set the appropriate department affiliations in nav for a user  /
      /                                                                */

      addAffiliations();

      // Add affiliations on login
      $rootScope.$on('djangoAuth.logged_in', function()
      {
        addAffiliations();
      });

      // Remove affiliations on logout
      $rootScope.$on('djangoAuth.logged_out', function()
      {
        affiliations.forEach(function(element, index)
        {
          msNavigationService.deleteItem('affiliations.department-' + index);
        });
      });

      // Get user data, and add affiliations
      function addAffiliations() {
        djangoAuth
        .authenticationStatus(true)
        .then(function()
        {
          return djangoAuth.profile();
        })
        .then(function(data)
        {
          // Add user's personal affiliations to navigation
          affiliations = data.affiliations ? data.affiliations : [];

          affiliations.forEach(function(element, index) {
            msNavigationService.saveItem('affiliations.department-' + index, {
              title: element.title,
              state: 'app.department',
              weight: 1,
              stateParams: {deptId: element.id},
            });
          });
        },function(error) {
          console.log(error);
        });
      }

    }

})();
