angular.module('app')
  .controller('AppCtrl', function(toneAnalysis) {

    this.toneAnalysis = toneAnalysis;
    this.submitToWatson = (text) => {
      // service logic
      console.log('triggered:', text);
      toneAnalysis(text, function (err, results) {
        console.log(results);
      });
    };
  })
  .component('app', {
    controller: 'AppCtrl',
    templateUrl: 'templates/app.html'
  });
