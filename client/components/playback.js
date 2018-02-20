angular.module('app')
  .controller('playbackController', function (recordingService, videoUploader, interviewService, broadcastService) {
    // services
    this.interviewService = interviewService;
    this.recordingService = recordingService;
    this.videoUploader = videoUploader;

    // cache DOM elements
    this.recordedVideo = document.querySelector('video#recorded');
    this.downloadButton = document.querySelector('button#download');

    // method to allow rendering of playback
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

    // method to turn video data into a URL
    this.generateVideoURL = () => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        if (reader.result) {
          this.uploadVideo(reader.result);
        }
      });
      reader.readAsDataURL(this.recordingBlob);
    };

    this.updateInterviewData = () => {
      const intObj = this.interviewService.curInt;
      if (intObj.userId) {
        this.interviewService.addInterview(intObj)
          .then(({ data }) => {
            console.log('INTERVIEW ADDED: ', data);
          });
      } else {
        console.log('You must be logged in to save the results.');
      }
    };

    // method that utilizes service to send video to the server
    // once a response is received, the current interview instance
    // is added to the DB if the user is logged in

    this.uploadVideo = (videoURL) => {
      this.videoUploader.upload(videoURL, (err, upload) => {
          if (upload.data) {
          const url = upload.data.url;
          console.log('Video successfully uploaded', upload);
          this.interviewService.updateOverall(null, 'videoUrl', url);
        } else {
          console.log('Video could not be uploaded', err);
        }
        this.updateInterviewData();
      });
    };

    // method to allow user to download the recording
    this.download = () => {
      const url = window.URL.createObjectURL(this.recordingBlob);
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

    this.init = () => {
      if (this.recordingService.recording.length) {
        this.recordedBlobs = [...this.recordingService.recording];
        this.recordingBlob = new Blob(this.recordedBlobs, { type: 'video/webm' });
        this.play();
        this.generateVideoURL();
      } else {
        this.updateInterviewData();
      }
    };
    this.init();
  })
  .component('playback', {
    controller: 'playbackController',
    templateUrl: 'templates/playback.html'
  });
