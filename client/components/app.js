angular.module('app')
  .controller('AppCtrl', function (toneAnalysis) {
    this.toneAnalysis = toneAnalysis;
    this.submitToWatson = (text) => {
      // service logic
      console.log('triggered:', text);
      toneAnalysis(text, function (err, results) {
        console.log(results);
      });
    };
    this.select = () => {
      const index = Math.floor(Math.random() * this.prompts.length);
      this.currentPrompt = this.prompts[index];
    };
    this.prompts = ['Tell me about yourself.', 'What excites you about joining our team?', 'How would co-workers describe the role you play on the team?', 'What\'s the difference between dot and bracket notation in a javascript object?', 'What is your favorite data structure and why?', 'What does the keyword \'new\' do?'];
  })
  .component('app', {
    controller: 'AppCtrl',
    templateUrl: 'templates/app.html'
  });

