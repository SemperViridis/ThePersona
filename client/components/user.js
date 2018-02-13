angular.module('app')
  .controller('userCtrl', function ($location, userService) {
    this.userService = userService;
    this.isLoggedIn = this.userService.isLoggedIn;
    this.userData = this.userService.userData;

    this.testing = () => {
      console.log('IN THIS.TESTING');
      this.userService.getAllUserData((err, user) => {
        console.log('IN THIS.USERSERVICE');
        if (err) {
          console.log('ERROR:', err);
        } else {
          console.log('USER INFO:', user);
        }
      });
    };


    this.userInterviews = [
      {
        id: 3546545,
        questions: [],
        createdAt: '2018-02-10 20:22:16'
      },
      {
        id: 7489877,
        questions: [],
        createdAt: '2018-02-10 20:22:16'
      },
      {
        id: 3214856,
        questions: [],
        createdAt: '2018-02-08 10:22:16'
      },
      {
        id: 4313216,
        questions: [],
        createdAt: '2018-02-08 10:22:16'
      },
      {
        id: 5646587,
        questions: [],
        createdAt: '2018-02-08 10:22:16'
      }
    ];

    this.removeActiveSub = (e) => {
      const activeElem = document.getElementsByClassName('activeSub')[0];
      if (activeElem) {
        activeElem.classList.remove('activeSub');
      }
      e.target.classList.add('activeSub');
    };

    this.userRemoveActive = setInterval(() => {
      if (document.readyState === 'complete') {
        clearInterval(this.userRemoveActive);
        const userActive = document.getElementsByClassName('ui vertical sticky menu dashboardMenu')[0].getElementsByClassName('active')[0];
        if (userActive) {
          userActive.classList.remove('active');
        }
      }
    }, 100);

    this.userInit = () => {
      this.userRemoveActive;
    };
  })
  .component('user', {
    controller: 'userCtrl',
    templateUrl: 'templates/user.html'
  });
