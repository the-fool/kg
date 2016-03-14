(function ()
{
    'use strict';

    angular
        .module('app.dashboards', [
            'app.dashboards.student'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        msNavigationServiceProvider.saveItem('student', {
            title: 'My Dashboard',
            icon  : 'icon-tile-four',
            state: 'app.dashboards_student',
            weight: 1
        });

    }

})();
