angular.module('app')
  .controller('speechController', function () {
    this.finalTranscript = ' ';
    this.recognizing = false;
    this.ignoreOnEnd;
    this.startTimestamp;

    if ('webkitSpeechRecognition' in window) {
      // initialize speech interface
      this.recognition = new webkitSpeechRecognition();

      // set attributes
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      // set event handlers
      this.recognition.onstart = () => {
        this.recognizing = true;
      };

      this.recognition.onerror = () => {
        this.ignoreOnEnd = true;
      };

      this.recognition.onend = () => {
        this.recognizing = false;
        if (this.ignoreOnEnd) {
          return;
        }
        if (!this.finalTranscript) {
          return;
        }
        if (window.getSelection) {
          window.getSelection().removeAllRanges();
          const range = document.createRange();
          range.selectNode(document.getElementById('final_span'));
          window.getSelection().addRange(range);
        }
      };
      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            this.finalTranscript += event.results[i][0].transcript;
            // console.log('final Transcript?:', this.finalTranscript);
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        console.log('final Transcript?:', this.finalTranscript);
        interim_span.innerHTML = interimTranscript;
        final_span.innerHTML = this.finalTranscript;
      };
    } else {
      // upgrade
      console.log('need upgrade');
    }


    this.startButton = (event) => {
      console.log('START', event);
      if (this.recognizing) {
        this.recognition.stop();
        return;
      }
      this.finalTranscript = '';
      this.recognition.start();
      this.ignoreOnend = false;
      final_span.innerHTML = '';
      interim_span.innerHTML = '';
      startTimestamp = event.timeStamp;
    };
  })

  .component('speech', {
    controller: 'speechController',
    templateUrl: 'templates/speech.html'
  });