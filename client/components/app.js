angular.module('app')
  .controller('AppCtrl', function() {

    this.submitToWatson = () => {
      // service logic
    };
  })
  .component('app', {
    controller: 'AppCtrl',
    templateUrl: 'templates/app.html'
  });
