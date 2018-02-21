angular.module('app')
  .service('recordingService', function (broadcastService) {
    this.recording = [];

    this.startRecording = () => {
      broadcastService.send('start');
    };

    this.submitRecording = () => {
      broadcastService.send('submit');
    };
  });
