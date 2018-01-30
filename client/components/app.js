angular.module('app')
  .controller('AppCtrl', function(toneAnalysis) {
    this.analysis = [];
    this.showAnalysis = (results) => {
      let tones = results.tones;
      let renderedTones = tones.map(function(tone) {
        return tone.tone_name + ' - ' + tone.score * 100 + '%';
      });
      ;
      this.analysis = renderedTones;
      console.log('rendered:', this.analysis)
    };
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
