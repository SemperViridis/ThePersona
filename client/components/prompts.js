angular.module('app')
  .component('prompt', {
    bindings: {
      prompts: '<'
    },
    templateUrl: 'templates/prompt.html'
  });
