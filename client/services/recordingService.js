angular.module('app')
  .service('recordingService', function (broadcastService) {
    this.recording = [];

    this.startRecording = () => {
      broadcastService.send('recording');
    };

    this.submitRecording = () => {
      broadcastService.send('submit');
    };
  });
