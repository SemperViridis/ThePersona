angular.module('app')
  .component('analysis', {
    bindings: {
      results: '<'
    },
    templateUrl: 'templates/analysis.html'
  });
