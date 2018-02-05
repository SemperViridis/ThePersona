angular.module('app')
  .controller('playbackController', function (recordingService) {
    // service
    this.recordingService = recordingService;

    // properties
    this.recordedBlobs = [...this.recordingService.recording];
    this.recordedVideo = document.querySelector('video#recorded');
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
            video.currentTime = 0;
            video.ontimeupdate = () => {
              delete video.ontimeupdate;
            };
          };
        }
      });
    };

    this.play();

    this.download = () => {
      const blob = new Blob(this.recordedBlobs, { type: 'video/webm' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'recording.webm';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    };
  })
  .component('playback', {
    controller: 'playbackController',
    templateUrl: 'templates/playback.html'
  });
