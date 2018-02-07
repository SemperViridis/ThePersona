angular.module('app')
  .controller('speechController', function ($scope, interviewService) {
    this.interviewService = interviewService;

    this.interviewStarted = false;
    this.responses = [];
    this.finalTranscript = '';
    this.recognizing = false;
    this.analysis = '';
    this.submitButton = $('button.large.ui.right.floated.button.submit');

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
      // final_span.innerHTML = '';
      this.submitButton.removeAttr('disabled');
      $scope.$apply();
      // if (this.ignoreOnEnd) {
      //   return;
      // }
      // if (!this.finalTranscript) {
      //   return;
      // }
    };

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) {
          this.finalTranscript += event.results[i][0].transcript + '.';
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      interim_span.innerHTML = interimTranscript;
      final_span.innerHTML = this.finalTranscript;
    };

    this.toggleRecognition = () => {
      if (!this.recognizing) {
        if (!this.responses.length) {
          // this.select(1);
        }
        this.finalTranscript = '';
        this.ignoreOnend = false;
        // final_span.innerHTML = '';
        // interim_span.innerHTML = '';
        this.recognition.start();
      } else {
        this.recognition.stop();
      }
    };

    this.handleSubmission = () => {
      console.log('response', this.responses);
      this.submitButton.attr('disabled', 'disabled');
      this.service.toneAnalysis(this.responses.join('.'), (err, results) => {
        this.result(results);
      });

      this.service.wordAnalysis(this.responses.join(' '), (err, results) => {
        this.fillers(results);
      });
    };

    this.getNextPrompt = () => {
      this.promptCount = this.promptCount + 1 || 1;
      this.reachedLastQuestion = (this.promptCount === 9);
      this.recognition.stop();
      this.responses.push(this.finalTranscript);
      this.interviewService.getNextPrompt();
      setTimeout(() => {
        this.recognition.start();
      }, 100);
    };

    this.startInterview = () => {
      this.interviewStarted = true;
      this.interviewService.getNextPrompt();
    };
  })

  .component('speech', {
    controller: 'speechController',
    templateUrl: 'templates/speech.html'
  });
