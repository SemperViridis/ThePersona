angular.module('app')
  .controller('resultsCtrl', function (interviewService, watsonService) {
    this.interviewService = interviewService;
    this.watsonService = watsonService;

    this.questions = ['Who are you', 'What do you like to do'];
    this.answers = ['I am the truth', 'I like to play soccer'];
    this.tones = [[
      {
        "score": 91,
        "tone_id": "confident",
        "tone_name": "Confident"
      },
      {
        "score": 83,
        "tone_id": "analytical",
        "tone_name": "Analytical"
      },
      {
        "score": 78,
        "tone_id": "joy",
        "tone_name": "Joy"
      }

    ], [
      {
        "score": 62,
        "tone_id": "sadness",
        "tone_name": "Sadness"
      },
      {
        "score": 84,
        "tone_id": "analytical",
        "tone_name": "Analytical"
      }
    ]];
    this.fillers = [{ like: 2, actually: 3 }, { totally: 10, so: 11 }];

    this.arranged = [];

    this.arrange = () => {
      for (let i = 0; i < this.questions.length; i += 1) {
        const output = {};
        output.question = this.questions[i];
        output.answer = this.answers[i];
        output.tones = this.tones[i];
        output.fillers = this.fillers[i];
        this.arranged.push(output);
        console.log('updated', this.arranged);
        }
      }
    this.arrange();

    this.interviewService = interviewService;
    this.selectedPrompt = this.interviewService.selectedPrompt;
    this.setPrompts = () => {
      const tag = this.options.selectedType.name;
      this.interviewService.setPrompt(tag, 10, () => {
        this.prompts = this.interviewService.prompts;
      });
    };
  })
  .component('results', {
    controller: 'resultsCtrl',
    templateUrl: 'templates/results.html'
  });
