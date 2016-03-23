(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(djangoAuth)
    {
        var vm = this;

        vm.progress = false;
        vm.authenticated = false;
        vm.login = login;
        vm.form = {'email':'', 'password':''};

        function login()
        {
          vm.progress = true;

          djangoAuth.login(
            vm.form.email,
            vm.form.password
          )
          .then(
            function (data) {
              // success
              console.log(data);
              vm.authenticated = true;
            },
            function (error) {
              // on error
            }
          )
          .finally(
            function() {
              vm.progress = false;
            }
          );
        }
    }

})();
