angular.module('app')
  .controller('resultsCtrl', function (interviewService, watsonService) {
    this.interviewService = interviewService;
    this.watsonService = watsonService;

    this.test = 'overall graph';
    this.interviewTones = watsonService.interviewAnalysis;
    this.interviewFillers = watsonService.interviewFillers;

    this.questions = interviewService.prompts;

    this.answers = this.watsonService.responses;

    this.tones = this.watsonService.answerAnalysis;
    this.fillers = this.watsonService.answerFillers;

    this.arranged = [];

    this.arrangeAnswers = () => {
      for (let i = 0; i < this.answers.length; i += 1) {
        const output = {};
        output.question = this.questions[i].question;
        output.answer = this.answers[i];
        output.tones = this.tones[i];
        output.fillers = this.fillers[i];
        this.arranged.push(output);
        console.log('updated arranged:', this.arranged);
      }
    }
    this.arrangeAnswers();

    this.overall = []
    this.arrangeOverall = () => {
      const output = {};
      output.tones= this.interviewTones[0];
      output.fillers = this.interviewFillers[0];
      output.overall = true;
      this.overall.push(output);
      console.log('this is the overall analysis:', this.overall);
      debugger;
    }
    this.arrangeOverall();

  })
  .component('results', {
    controller: 'resultsCtrl',
    templateUrl: 'templates/results.html'
  });
