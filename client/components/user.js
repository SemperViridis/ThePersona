angular
  .module('app')
  .controller('userCtrl', function ($location, userService, interviewService, $scope) {
    this.userService = userService;
    this.isLoggedIn = this.userService.isLoggedIn;
    this.userData = this.userService.userData;
    this.interviewService = interviewService;

    $scope.$on('loggedIn', () => {
      this.isLoggedIn = this.userService.isLoggedIn;
      this.userData = this.userService.userData;
    });

    this.getInterviews = () => {
      this.interviewService.getInterviews(this.userData.id)
        .then(({ data }) => {
          this.interviews = data;
          this.getOverallLanguage();
          this.getOverallTone();
          this.getOverallPersonality();
          this.historyGraphData = this.interviews.map(interview => (
            interview.overallTones.tone_categories[1].tones
          ));
          this.dataLoaded = true;
          console.log(this.historyGraphData);
          console.log('USER INTERVIEWS IN CLIENT: ', this.interviews);
        });
    };

    this.getAnswers = () => {
      this.interviewService.getAnswers(this.userData.id)
        .then(({ data }) => {
          this.answers = data;
        })
        .then(() => {
          this.answers.forEach((answer) => {
            let maxScore = 0.50;
            let maxTone = '';
            console.log(answer.toneAnalysis);
            if (answer.toneAnalysis.tone_categories) {
              answer.toneAnalysis.tone_categories.forEach((category) => {
                category.tones.forEach((tone) => {
                  console.log('new tone score:', tone.tone_name, tone.score);
                  if (tone.score > maxScore) {
                    maxScore = tone.score;
                    maxTone = tone.tone_name;
                    answer.dominantTone = { maxTone: maxTone, maxScore: Math.round(maxScore * 100) };
                  }
                });
              });
            }
          });
          console.log('USER ANSWERS IN CLIENT: ', this.answers);
        });
    };

    this.getOverallTone = () => {
      this.overallTone = this.interviews
        .map(interview => (
          interview.overallTones.tone_categories[0].tones
        ))
        .reduce((output, interview) => {
          for (let i = 0; i < interview.length; i += 1) {
            const averageScore = (output[i].score + interview[i].score) / 2 || interview[i].score;
            output[i].score = averageScore;
          }
          return output;
        }, [
          { tone_id: 'anger', tone_name: 'Anger' },
          { tone_id: 'disgust', tone_name: 'Disgust' },
          { tone_id: 'fear', tone_name: 'Fear' },
          { tone_id: 'joy', tone_name: 'Joy' },
          { tone_id: 'sadness', tone_name: 'Sadness' }
        ]);
    };

    this.getOverallLanguage = () => {
      this.overallLanguage = this.interviews
        .map(interview => (
          interview.overallTones.tone_categories[1].tones
        ))
        .reduce((output, interview) => {
          for (let i = 0; i < interview.length; i += 1) {
            const averageScore = (output[i].score + interview[i].score) / 2 || interview[i].score;
            output[i].score = averageScore;
          }
          return output;
        }, [
          { tone_id: 'analytical', tone_name: 'Analytical' },
          { tone_id: 'confident', tone_name: 'Confident' },
          { tone_id: 'tentative', tone_name: 'Tentative' }
        ]);
    };

    this.getOverallPersonality = () => {
      this.overallPersonality = this.interviews
        .map(interview => (
          interview.overallTones.tone_categories[1].tones
        ))
        .reduce((output, interview) => {
          for (let i = 0; i < interview.length; i += 1) {
            const averageScore = (output[i].score + interview[i].score) / 2 || interview[i].score;
            output[i].score = averageScore;
          }
          return output;
        }, [
          { tone_id: 'openness_big5', tone_name: 'Openness' },
          { tone_id: 'conscientiousness_big5', tone_name: 'Conscientiousness' },
          { tone_id: 'extraversion_big5', tone_name: 'Extraversion' },
          { tone_id: 'agreeableness_big5', tone_name: 'Agreeableness' },
          { tone_id: 'emotional_range_big5', tone_name: 'Emotional Range' }
        ]);
    };

    this.refreshInterviews = (e) => {
      this.removeActiveSub(e);
      this.getInterviews();
    };

    this.refreshAnswers = (e) => {
      this.removeActiveSub(e);
      this.getAnswers();
    };

    this.removeActiveSub = e => {
      const activeElem = document.getElementsByClassName('activeSub')[0];
      if (activeElem) {
        activeElem.classList.remove('activeSub');
      }
      e.target.classList.add('activeSub');
    };

    this.userRemoveActive = setInterval(() => {
      if (document.readyState === 'complete') {
        clearInterval(this.userRemoveActive);
        const userActive = document
          .getElementsByClassName('ui vertical sticky menu dashboardMenu')[0]
          .getElementsByClassName('active')[0];
        if (userActive) {
          userActive.classList.remove('active');
        }
      }
    }, 100);

    this.init = () => {
      this.userRemoveActive;
      this.getInterviews();
      this.getAnswers();
    };
    this.init();
  })
  .component('user', {
    controller: 'userCtrl',
    templateUrl: 'templates/user.html'
  });
