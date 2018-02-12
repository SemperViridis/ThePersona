angular.module('app')
  .controller('userCtrl', function ($location) {
    this.username = 'Patty Kovash';
    this.numInterviews = 10;

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
