'use strict';
angular.module('meanApp')
  .controller('RegistrationCtrl', function ($scope, $http, $state) {
    $scope.register = function(user){
      console.log('user', user);
      $http.post('/api/signup', user).then(function(data){
          console.log('result', data);   
      });
        
    };
  });