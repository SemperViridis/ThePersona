angular.module('app').controller('RadarCtrl', function ($scope) {
  this.$onInit = function() {
    $scope.labels = ['Anger', 'Fear', 'Tentative', 'Sadness', 'Analytical', 'Confident', 'Joy'];

    $scope.data = [
      [10, 30, 65, 10, 68, 75, 98]
    ];

    for (let i = 0; i < $scope.labels.length; i += 1) {
      for (let k = 0; k < this.output.length; k += 1) {
        if (this.output[k].tone_name === this.labels[i]) {
          $scope.data[i] = this.output[k].score;
        }
      }
    }
  };
})

  .component('radar', {
    bindings: {
      output: '=',
    },
    controller: 'RadarCtrl',
    templateUrl: 'templates/radar.html'
  });
