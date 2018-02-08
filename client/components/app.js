angular.module('app')
  .controller('AppCtrl', function ($uibModal) {
    this.animationsEnabled = true;
    this.isLoggedIn = true;
    this.openComponentModal = function () {
      const modalInstance = $uibModal.open({
        animation: this.animationsEnabled,
        component: 'login'
      });
    };

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
  })
  .component('app', {
    controller: 'AppCtrl',
    templateUrl: 'templates/app.html'
  });
