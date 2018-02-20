angular.module('app')
  .controller('recorderController', function (recordingService, interviewService, $scope) {
    // services
    this.recordingService = recordingService;
    this.interviewService = interviewService;

    // broadcast listeners
    $scope.$on('recording', () => {
      this.startRecording();
    });
    $scope.$on('submit', () => {
      this.toggleRecording();
    });

    // state properties
    this.recordedBlobs = [];

    // initialize media source
    this.mediaSource = new MediaSource();
    this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen, false);

    // cache HTML elements
    // this.recorderVideo = document.querySelector('video#recorder');
    this.recordButton = document.querySelector('button#record');

    // initialize stream
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((stream) => { this.stream = stream; });

    // state methods
    this.handleDataAvailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.recordedBlobs.push(event.data);
      }
    };

    this.startRecording = () => {
      if (this.stream) {
        this.mediaRecorder = new MediaRecorder(this.stream);
        this.mediaRecorder.ondataavailable = this.handleDataAvailable;
        this.mediaRecorder.start(10);
        this.recordButton.textContent = 'Stop';
      }
    };

    this.toggleRecording = () => {
      if (this.recordButton.textContent === 'Record') {
        this.startRecording();
      } else if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        debugger;
        this.recordButton.textContent = 'Record';
        this.recordingService.recording = this.recordedBlobs;
      }
    };
  })

  .component('recorder', {
    controller: 'recorderController',
    templateUrl: 'templates/recorder.html'
  });
