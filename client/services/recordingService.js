angular.module('app')
  .service('recordingService', function (broadcastService) {
    this.recording = [];

    this.startRecording = () => {
      console.log('testing');
      broadcastService.send('recording');
    };
  });
