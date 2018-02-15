angular.module('app').controller('RadarCtrl', function ($scope) {
  $scope.labels = ['Openness', 'Extraversion', 'Agreeableness', 'Conscientiousness', 'Emotional Range'];

  $scope.data = [
    [20, 20, 20, 20, 20]
  ];

  if ($scope.$ctrl.output) {
    for (let i = 0; i < $scope.labels.length; i += 1) {
      for (let k = 0; k < $scope.$ctrl.output.length; k += 1) {
        if ($scope.$ctrl.output[k].tone_name === $scope.labels[i]) {
          $scope.data[0][i] = $scope.$ctrl.output[k].score * 100;
        }
      }
    }
  }
})

  .component('radar', {
    bindings: {
      output: '<',
    },
    templateUrl: 'templates/radar.html'
  });
