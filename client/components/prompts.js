angular.module('app')
  .component('prompts', {
    bindings: {
      prompt: '<'
    },
    templateUrl: 'templates/prompts.html'
  });
