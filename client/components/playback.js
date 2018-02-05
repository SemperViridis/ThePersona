angular.module('app')
  .controller('playbackController', function (recordingService) {
    this.recordingService = recordingService;
    console.log(this.recordingService.recording);

    // properties
    this.recorderBlobs = []; // need to retrieve this from recorder
    this.recorderVideo = document.querySelector('video#recorded');
    this.playButton = document.querySelector('button#play');
    this.downloadButton = document.querySelector('button#download');

    // methods
    this.play = () => {
      const { recorderVideo } = this;
      const superBuffer = new Blob(this.recorderBlobs);
      recorderVideo.src = window.URL.createObjectURL(superBuffer);
      recorderVideo.addEventListener('loadedmetadata', () => {
        if (recorderVideo.duration === Infinity) {
          recorderVideo.currentTime = 1e101;
          recorderVideo.ontimeupdate = () => {
            recordedVideo.currentTime = 0;
            recorderVideo.ontimeupdate = () => {
              delete recorderVideo.ontimeupdate;
              recorderVideo.play();
            };
          };
        }
      });
    };
  })
  .component('playback', {
    controller: 'playbackController',
    templateUrl: 'templates/playback.html'
  });
