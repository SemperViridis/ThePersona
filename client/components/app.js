angular.module('app')
  .controller('AppCtrl', function (toneAnalysis) {
    this.toneAnalysis = toneAnalysis;
    this.analysis = [];
    this.fillerAnalysis = [];
    this.total = '';

    this.showAnalysis = (results) => {
      const { tones } = results;
      const renderedTones = tones.map(tone => `${tone.tone_name} - ${Math.round(tone.score * 100)} %`);
      this.analysis = renderedTones;
    };

    this.showFillers = (result) => {
      this.fillerAnalsis = [];
      for (let j in result[1]) {
        this.fillerAnalysis.push(`You used the word '${j}' ${result[1][j]} times`);
      }
      this.total = `Total word count: ${result[2]}`;
    };
    this.select = (numPrompts) => {
      const len = this.prompts.length;
      const dupPrompts = this.prompts.slice();
      let count = numPrompts;
      let index;
      this.currentPrompts = [];
      if (numPrompts > len) {
        count = len;
      }
      for (let i = 0; i < count; i += 1) {
        index = Math.floor(Math.random() * dupPrompts.length);
        this.currentPrompts.push(dupPrompts[index]);
        dupPrompts.splice(index, 1);
      }
    };
  })
  .component('app', {
    controller: 'AppCtrl',
    templateUrl: 'templates/app.html'
  });
