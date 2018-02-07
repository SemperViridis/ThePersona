angular.module('app')
  .service('recordingService', function () {
    this.recording = [];

    this.startRecording = () => console.log('testing');
  });
