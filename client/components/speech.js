angular.module('app')
  .controller('speechController', function ($scope) {
    this.responses = [];
    this.finalTranscript = '';
    this.recognizing = false;
    this.analysis = '';

    this.handleSubmission = () => {
      this.service.toneAnalysis(this.finalTranscript, (err, results) => {
        this.result(results);
      });
    };

    if ('webkitSpeechRecognition' in window) {
      // initialize speech interface
      this.recognition = new webkitSpeechRecognition();

      // set attributes
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      // set event handlers
      this.recognition.onstart = () => {
        this.recognizing = true;
        $scope.$apply();
      };

      this.recognition.onerror = () => {
        this.ignoreOnEnd = true;
      };

      this.recognition.onend = () => {
        this.recognizing = false;
        this.responses.push(this.finalTranscript);
        $scope.$apply();
        if (this.ignoreOnEnd) {
          return;
        }
        if (!this.finalTranscript) {
          return;
        }
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          if (event.results[i].isFinal) {
            this.finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        interim_span.innerHTML = interimTranscript;
        final_span.innerHTML = this.finalTranscript;
      };
    } else {
      // upgrade
      console.log('need upgrade');
    }


    this.startButton = () => {
      if (!this.recognizing) {
        if (!this.responses.length) {
          this.select(1);
        }
        this.finalTranscript = '';
        this.ignoreOnend = false;
        final_span.innerHTML = '';
        interim_span.innerHTML = '';
        this.startTimestamp = Date.now();
        this.recognition.start();
      } else {
        this.recognition.stop();
      }
    };
  })

  .component('speech', {
    bindings: {
      service: '<',
      result: '<',
      select: '<'
    },
    controller: 'speechController',
    templateUrl: 'templates/speech.html'
  });
