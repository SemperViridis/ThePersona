angular.module('app')
  .controller('resultsCtrl', function (interviewService, watsonService, $scope) {
    this.interviewService = interviewService;
    this.watsonService = watsonService;

    this.test = 'overall graph';
    $scope.$on('analysis Done', (event) => {

      //Analysis for whole interview
      this.interviewTones = watsonService.interviewAnalysis;
      this.interviewFillers = watsonService.interviewFillers;

      //Analysis per question
      this.questions = interviewService.prompts;
      this.answers = this.watsonService.responses;

      this.tones = this.watsonService.answerAnalysis;
      this.fillers = this.watsonService.answerFillers;

      debugger;
      //Arrange analysis into object per question
      this.arranged = [];

      this.arrangeAnswers = () => {
        for (let i = 0; i < this.answers.length; i += 1) {
          const output = {};
          output.question = this.questions[i].question;
          output.answer = this.answers[i];
          output.tones = this.tones[i];
          output.fillers = this.fillers[i];
          this.arranged.push(output);
          console.log('results output object:', output);
          console.log('updated arranged:', this.arranged);
        }
      }
      this.arrangeAnswers();

      //Arrange overall interview analysis into one object
      this.overall = []
      this.arrangeOverall = () => {
        const output = {};
        output.tones= this.interviewTones[0];
        output.fillers = this.interviewFillers[0];
        output.overall = true;
        this.overall.push(output);
        console.log('this is the overall analysis:', this.overall);
      }
      this.arrangeOverall();
    })


  })
  .component('results', {
    controller: 'resultsCtrl',
    templateUrl: 'templates/results.html'
  });
