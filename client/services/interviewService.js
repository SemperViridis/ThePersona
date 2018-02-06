angular.module('app')
  .service('interviewService', function ($http) {
    this.prompts = [];
    this.selectedPrompt = null;
    this.getPrompts = (tag, numPrompts, callback) => {
      $http.get('http://localhost:3000/api/prompts', {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          tags: tag,
          numPrompts: numPrompts
        }
      })
        .then(({ data }) => {
          if (callback) {
            callback(null, data);
          }
        }, ({ data }) => {
          if (callback) {
            callback(data, null);
          }
        });
    };

    this.setPrompt = (tag, numPrompts, callback) => {
      this.getPrompts(tag, numPrompts, (err, data) => {
        if (err) {
          throw err;
        } else {
          console.log('DATA======', data);
          this.prompts = data;
          console.log('this.prompts after:', this.prompts);
          callback(data);
        }
      });

    };

    this.selectPrompt = (prompt) => {
      this.selectedPrompt = prompt;
    };
  });
