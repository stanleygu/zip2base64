'use strict';

/**
 * @ngdoc function
 * @name zip2base64App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zip2base64App
 */
angular.module('zip2base64App')
  .controller('MainCtrl', function($scope) {
    $scope.settings = {
      archive: '1'
    };
    var update = function() {
      $scope.base64EncodedUrl = 'http://carbon.sysb.io/import?encoding=base64' +
      '&format=' + 'text' +
        '&archive=' + $scope.settings.archive +
        '&resource=' + encodeURIComponent($scope.base64String);
    };
    $scope.$watch('settings.archive', function() {
      update();
    });
    $scope.dropzoneConfig = {
      init: function() {
        $scope.dropzone = this.on('addedfile', function(file) {
          var fr = new FileReader();
          fr.onload = function() {
            $scope.base64String = fr.result.replace(/data.*base64/, '');
            $scope.dropzone._finished(file, 'Done!');
            update();
            $scope.$digest();
          };
          fr.readAsDataURL(file);
        });
      },
      url: '/',
      autoProcessQueue: false,
      maxFiles: 1,
      maxfilesexceeded: function() {
        $scope.dropzone.removeFile($scope.dropzone.files[0]);
      },
      error: function(file, kresponseText, e) {
        console.log('Error! ', e);
      }
    };
  });
