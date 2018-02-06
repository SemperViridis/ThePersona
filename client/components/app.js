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
    this.prompts = ['Tell me about yourself.', 'What excites you about joining our team?', 'How would co-workers describe the role you play on the team?', 'What\'s the difference between dot and bracket notation in a javascript object?', 'What is your favorite data structure and why?', 'In Javascript, what does the keyword \'new\' do?', 'What are your hobbies?', 'Explain how `JSON.stringify(something)` is different than `something.toString()`', 'What are the differences between == and ===?', 'What is the difference between "call" and "apply"? What are their purposes?', 'What is Event Delegation?', 'Why did you choose to learn Javascript over another language?', 'What is a closure? How might we use closure to our advantage?', 'Tell me about a recent project you worked on', 'Tell me about a technical challenge you ran into recently.', 'Give an example of a goal you reached and tell me how you achieved it.', 'Tell me about a recent project you worked on', 'How did you handle meeting a tight deadline?'];

  })
  .component('app', {
    controller: 'AppCtrl',
    templateUrl: 'templates/app.html'
  });

