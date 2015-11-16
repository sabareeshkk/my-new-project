'use strict';
angular.module('meanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'app/register/register.html',
        controller: 'RegistrationCtrl'
      });
  });
