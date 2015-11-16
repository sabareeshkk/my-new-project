'use strict';

angular.module('meanApp')
  .controller('MainCtrl', function ($scope, $http, Upload, $timeout) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    $http.get('/api/project').success(function(result) {
      console.log(result);
      $scope.project = result;
    });
    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing }).success(function(){
        $http.get('/api/things').success(function(awesomeThings) {
        console.log('awsomwthings', awesomeThings)
      $scope.awesomeThings = awesomeThings;
    });
      })
      $scope.newThing = '';    
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
      $http.get('/api/things').success(function(awesomeThings) {
        console.log('awsomwthings', awesomeThings)
      $scope.awesomeThings = awesomeThings;
    });
    }
    $scope.uploadFiles = function(file, errFiles) {
      console.log('file', file);
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: '/profile',
                data: {avatar: {data: file}}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        }   
    }
  });
