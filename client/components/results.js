angular.module('app')
  .controller('resultsCtrl', function (interviewService) {
    this.interviewService = interviewService;
    this.selectedPrompt = this.interviewService.selectedPrompt;
    this.setPrompts = () => {
      const tag = this.options.selectedType.name;
      this.interviewService.setPrompt(tag, 10, () => {
        this.prompts = this.interviewService.prompts;
      });
    };
  })
  .component('results', {

    templateUrl: 'templates/results.html'
  });
