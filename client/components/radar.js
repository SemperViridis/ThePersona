angular.module('app').controller('RadarCtrl', function ($scope) {
  // this.$onInit = function() {
  $scope.labels = ['Anger', 'Fear', 'Sadness', 'Tentative', 'Joy', 'Analytical', 'Confident'];

  $scope.data = [
    [20, 20, 20, 20, 20, 20, 20]
  ];

  console.log('scope', $scope.$ctrl);
  console.log('this', this);

  for (let i = 0; i < $scope.labels.length; i += 1) {
    for (let k = 0; k < $scope.$ctrl.output.length; k += 1) {
      if ($scope.$ctrl.output[k].tone_name === $scope.labels[i]) {
        $scope.data[0][i] = $scope.$ctrl.output[k].score;
        console.log('changed datapoint:', $scope.data[i], i);
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
