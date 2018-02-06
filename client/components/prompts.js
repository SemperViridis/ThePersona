angular.module('app')
  .component('prompts', {
    bindings: {
      selectedPrompt: '<'
    },
    controller: 'interviewCtrl',
    templateUrl: 'templates/prompts.html'
  });
