angular.module('app')
  .service('recordingService', function () {
    this.recording = [];
    this.testing = () => console.log('This is the recording service');
  });
