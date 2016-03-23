(function ()
{
    'use strict';

    angular
        .module('kgraph')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $timeout, $state, djangoAuth)
    {

        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function ()
        {
            $rootScope.loadingProgress = true;
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });

        // Auth
        $rootScope.authenticated = false;
        // Init the auth service
        djangoAuth.authenticationStatus(true, false)
            .then(
              function(data) {
                $rootScope.authenticated = true;
              },
              function(error) {
                console.log(error);
                $rootScope.authenticated = false;
              }
            );
      
        // Wait and respond to the logout event.
        $rootScope.$on('djangoAuth.logged_out', function() {
          $rootScope.authenticated = false;
          $state.go('app.department');
        });
        // Wait and respond to the log in event.
        $rootScope.$on('djangoAuth.logged_in', function() {
          $rootScope.authenticated = true;
          $state.go('app.dashboards_student');
        });
        // If the user attempts to access a restricted page, redirect them back to the main page.
        $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection){
          console.error("Unable to change routes.  Error: ", rejection)
          $state.go('home');
        });


    }
})();
