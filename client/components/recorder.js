angular.module('app')
  .controller('recorderController', function (recordingService, interviewService) {
    this.recordingService = recordingService;
    this.interviewService = interviewService;

    this.recordedBlobs = [];
    this.mediaSource = new MediaSource();
    this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen, false);
    this.recorderVideo = document.querySelector('video#recorder');
    this.recordButton = document.querySelector('button#record');
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then(stream => this.handleSuccess(stream));

    this.handleSourceOpen = () => {
      this.sourceBuffer = mediaSource.addSourceBuffer('video/webm');
    };

    this.handleDataAvailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.recordedBlobs.push(event.data);
      }
    };

    this.handleSuccess = (stream) => {
      this.stream = stream;
      this.recorderVideo.srcObject = stream;
      this.recorderVideo.onloadedmetadata = () => {
        this.recorderVideo.play();
      };
    };

    this.startRecording = () => {
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.mediaRecorder.ondataavailable = this.handleDataAvailable;
      this.mediaRecorder.start(10);
      this.recordButton.textContent = 'Stop';
    };

    this.toggleRecording = () => {
      this.interviewService.runMock();
      if (this.recordButton.textContent === 'Record') {
        this.startRecording();
      } else {
        this.mediaRecorder.stop();
        this.recordButton.textContent = 'Record';
        this.recordingService.recording = this.recordedBlobs;
      }
    };
  })

  .component('recorder', {
    controller: 'recorderController',
    templateUrl: 'templates/recorder.html'
  });
