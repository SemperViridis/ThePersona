angular.module('app')
  .controller('interviewCtrl', function (interviewService, $location) {
    this.interviewService = interviewService;

    this.prompts = ['question 1', 'question 2', 'question 3'];
    this.currentPromptIndex = 0;
    this.currentPrompt = this.prompts[this.currentPromptIndex];
    this.interviewStarted = false;

    this.selectedPracticePrompt = this.interviewService.selectedPrompt;
    this.options = {
      type: [
        { id: 0, name: '', value: '' },
        { id: 1, name: 'all', value: 'All' },
        { id: 2, name: 'non-technical', value: 'Non-Technical' },
        { id: 3, name: 'technical', value: 'Technical' }
      ],
      selectedType: { id: 1, name: 'all', value: 'All' }
    };

    this.init = () => {
      if ($location.path() === '/interview/practice') {
        this.setPrompts();
      }
      if ($location.path() === '/interview/mock') {
        this.interviewService.queryPrompts('all', (err, data) => {
          this.prompts = this.interviewService.selectNumPrompts(10, data);
        });
      }
    };

    this.setPrompts = () => {
      const tag = this.options.selectedType.name;
      this.interviewService.queryPrompts(tag, (err, data) => {
        this.prompts = this.interviewService.selectNumPrompts(null, data);
      });
    };

    this.selectPrompt = () => {
      this.selectedPrompt = this.interviewService.selectPrompt(this.selectedPrompt);
    };

    this.init();
  })
  .component('interview', {
    controller: 'interviewCtrl',
    templateUrl: 'templates/interview.html'
  });
