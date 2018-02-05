angular.module('app')
  .service('recordingService', function () {
    this.recording = [];
    this.testing = () => console.log(this.recording);
  });
