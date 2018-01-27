angular.module('app')
  .controller('speechController', function () {
    this.finalTranscript = '';
    this.recognizing = false;
    // this.ignoreOnEnd;
    // this.startTimestamp;

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

      this.recognition.onerror = function () {
        this.ignoreOnEnd = true;
      };

      this.recognition.onend = function () {
        this.recognizing = false;
        if (this.ignoreOnEnd) {
          return;
        }
        if (!finalTranscript) {
          return;
        }
        if (window.getSelection) {
          window.getSelection().removeAllRanges();
          const range = document.createRange();
          range.selectNode(document.getElementById('final_span'));
          window.getSelection().addRange(range);
        }
      };

      this.recognition.onresult = function (event) {
        console.log('result', event);
      };
    } else {
      // upgrade
      console.log('need upgrade');
    }

    this.startButton = function () {
      if (this.recognizing) {
        this.recognition.stop();
        return;
      }
      this.recognition.start();
    };
  })

  .component('speech', {
    controller: 'speechController',
    templateUrl: 'templates/speech.html'
  });
