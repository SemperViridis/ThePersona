angular
  .module('app')
  .controller('userCtrl', function($location, userService, interviewService, $scope) {
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
          debugger;
          this.getOverallLanguage().tone;
          this.getOverallTone();
          this.getOverallPersonality();
          console.log('USER INTERVIEWS IN CLIENT: ', this.interviews);
        });
    };

    this.getAnswers = () => {
      this.interviewService.getAnswers(this.userData.id)
        .then(({ data }) => {
          this.answers = data;
          console.log('USER ANSWERS IN CLIENT: ', this.answers);
        });
    };

    this.userVideos = [
      {
        id: 1,
        createdAt: '2018-02-08',
        url:
          'http://res.cloudinary.com/dinoa/video/upload/v1518723667/hbkt8dpj8vh2sxoxtzqj.mkv'
      },
      {
        id: 2,
        createdAt: '2018-02-09',
        url:
          'http://res.cloudinary.com/dinoa/video/upload/v1518750845/lh0hkcx7hjpnizvlpw6o.mkv'
      },
      {
        id: 3,
        createdAt: '2018-02-10',
        url:
          'http://res.cloudinary.com/dinoa/video/upload/v1518723667/hbkt8dpj8vh2sxoxtzqj.mkv'
      },
      {
        id: 4,
        createdAt: '2018-02-13',
        url:
          'http://res.cloudinary.com/dinoa/video/upload/v1518750845/lh0hkcx7hjpnizvlpw6o.mkv'
      },
      {
        id: 5,
        createdAt: '2018-02-16',
        url:
          'http://res.cloudinary.com/dinoa/video/upload/v1518750845/lh0hkcx7hjpnizvlpw6o.mkv'
      }
    ];


    this.getOverallTone = () => {
      this.overallTone = this.interviews
        .map(interview => (
          interview.overallTones.tone_categories[0].tones
        ));
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
      this.overallPersonality = this.interviews.map(interview => (
        interview.overallTones.tone_categories[1].tones
      ));
    };

    this.analysis = [
      {
        language: [
          { score: 0.920175, tone_id: 'analytical', tone_name: 'Analytical' },
          { score: 0.85, tone_id: 'confident', tone_name: 'Confident' },
          { score: 0.462727, tone_id: 'tentative', tone_name: 'Tentative' }
        ],
        social: [
          { score: 0.746622, tone_id: 'openness_big5', tone_name: 'Openness' },
          {
            score: 0.357534,
            tone_id: 'conscientiousness_big5',
            tone_name: 'Conscientiousness'
          },
          {
            score: 0.627449,
            tone_id: 'extraversion_big5',
            tone_name: 'Extraversion'
          },
          {
            score: 0.889633,
            tone_id: 'agreeableness_big5',
            tone_name: 'Agreeableness'
          },
          {
            score: 0.596624,
            tone_id: 'emotional_range_big5',
            tone_name: 'Emotional Range'
          }
        ],

        tones: [
          { score: 0.081541, tone_id: 'anger', tone_name: 'Anger' },
          { score: 0.0168, tone_id: 'disgust', tone_name: 'Disgust' },
          { score: 0.334638, tone_id: 'fear', tone_name: 'Fear' },
          { score: 0.740808, tone_id: 'joy', tone_name: 'Joy' },
          { score: 0.1278, tone_id: 'sadness', tone_name: 'Sadness' }
        ]
      }
    ];

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
