angular.module('app')
  .controller('demoCtrl', function () {
    console.log('Inside demo controller!');
  })
  .component('demo', {
    controller: 'demoCtrl',
    templateUrl: 'templates/demo.html'
  });
