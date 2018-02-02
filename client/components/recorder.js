angular.module('app')
  .controller('recorderController', function () {
    this.mediaSource = new MediaSource();
    this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen, false);

    this.recorderVideo = angular.element(document).find('recorder');
    this.recordButton = angular.element(document).find('record');

    this.constraints = {
      audio: true,
      video: true
    };

    this.handleSourceOpen = () => {
      console.log('MediaSource opened');
      this.sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
      console.log('Source buffer: ', sourceBuffer);
    };
  })

  .component('recorder', {
    controller: 'recorderController',
    templateUrl: 'templates/recorder.html'
  });
