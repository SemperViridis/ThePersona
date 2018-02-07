angular.module('app')
  .service('recordingService', function (broadcastService) {
    this.recording = [];

    this.startRecording = () => {
      console.log('recording started');
      broadcastService.send('recording');
    };

    this.submitRecording = () => {
      console.log('recording submitted');
      broadcastService.send('submit');
    };
  });
