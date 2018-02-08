angular.module('app').controller('RadarCtrl', function ($scope) {
  // this.$onInit = function() {
  $scope.labels = ['Anger', 'Fear', 'Joy', 'Sadness', 'Analytical', 'Confident', 'Tentative'];

  $scope.data = [
    [75, 81, 98, 78, 68, 21, 89]
  ];

  console.log('scope', $scope.$ctrl.output);
  console.log('this', this.output);

  // for (let i = 0; i < $scope.labels.length; i += 1) {
  //   for (let k = 0; k < this.output.length; k += 1) {
  //     if (this.output[k].tone_name === this.labels[i]) {
  //       $scope.data[i] = this.output[k].score;
  //     }
  //   }
  // }
})

  .component('radar', {
    bindings: {
      output: '<',
    },
    templateUrl: 'templates/radar.html'
  });
