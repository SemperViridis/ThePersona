angular.module('app')
  .controller('userCtrl', function () {
    this.username = 'Patty Kovash';
    this.numInterviews = 10;


  })
  .component('user', {
    controller: 'userCtrl',
    templateUrl: 'templates/user.html'
  });
