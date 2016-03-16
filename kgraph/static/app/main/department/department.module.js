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
      /** Set the appropriate department affiliations in quick-nav for a user */
      djangoAuth.profile().then(function(data) {
        // Navigation
        var affiliations = data.affiliations ? data.affiliations : [];

        msNavigationService.saveItem('affiliations', {
          title : 'SCHOOLS',
          icon  : 'icon-tile-four',
          weight: 1
        });

        affiliations.forEach(function(element, index) {
            console.log('adding');
            msNavigationService.saveItem('affiliations.department-' + index, {
                title: 'Dep. ' + index,
                state: 'app.department',
                weight: 1,
                stateParams: {deptId: element},
            });
        });

      });


    }

})();
