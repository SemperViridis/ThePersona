angular.module('app')
  .component('prompts', {
    bindings: {
      prompt: '<'
    },
    controller: 'interviewCtrl',
    templateUrl: 'templates/prompts.html'
  });
