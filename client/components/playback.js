angular.module('app')
  .controller('playbackController', function (recordingService) {
    // service
    this.recordingService = recordingService;

    // properties
    this.recordedBlobs = [...this.recordingService.recording];
    this.recordedVideo = document.querySelector('video#recorded');
    this.playButton = document.querySelector('button#play');
    this.downloadButton = document.querySelector('button#download');

    // methods
    this.play = () => {
      const video = this.recordedVideo;
      const superBuffer = new Blob(this.recordedBlobs);
      video.src = window.URL.createObjectURL(superBuffer);
      video.addEventListener('loadedmetadata', () => {
        if (video.duration === Infinity) {
          video.currentTime = 1e101;
          video.ontimeupdate = () => {
            recordedVideo.currentTime = 0;
            video.ontimeupdate = () => {
              delete video.ontimeupdate;
              video.play();
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
