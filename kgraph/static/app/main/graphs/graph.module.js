(function ()
{
    'use strict';

    angular
        .module('app.graphs', [
            'app.graphs.department'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
      /*  msNavigationServiceProvider.saveItem('dashboards', {
            title : 'Dashboards',
            icon  : 'icon-tile-four',
            weight: 1
        });
*/
        msNavigationServiceProvider.saveItem('department', {
            title: 'Explore',
            icon  : 'icon-tile-four',
            state: 'app.graphs_department',
            weight: 1
        });

    }

})();
