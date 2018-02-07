angular.module('app')
  .controller('speechController', function ($scope, interviewService, toneAnalysis) {
    this.interviewService = interviewService;
    this.toneAnalysisService = toneAnalysis;

    this.interviewStarted = false;
    this.responses = [];
    this.finalTranscript = '';
    this.interimTranscript = '';
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
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) {
          this.finalTranscript += `${event.results[i][0].transcript} .`;
        } else {
          this.interimTranscript += event.results[i][0].transcript;
        }
      }
    };

    this.toggleRecognition = () => {
      if (!this.recognizing) {
        this.finalTranscript = '';
        this.ignoreOnend = false;
        this.recognition.start();
      } else {
        this.recognition.stop();
      }
    };

    this.handleSubmission = () => {
      this.submitButton.attr('disabled', 'disabled');
      this.toneAnalysisService.toneAnalysis(this.responses.join('.'), (err, results) => {
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
