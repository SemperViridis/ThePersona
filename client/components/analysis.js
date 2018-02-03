angular.module('app')
  .component('analysis', {
    bindings: {
      results: '<',
      fillers: '<',
      total: '<'
    },
    templateUrl: 'templates/analysis.html'
  });
