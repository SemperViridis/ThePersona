angular.module('app').controller('RadarCtrl', function ($scope) {
  $scope.labels = ['Anger', 'Fear', 'Joy', 'Sadness', 'Analytical', 'Confident', 'Tentative'];

  $scope.data = [
    [75, 81, 98, 78, 68, 21, 89]
  ];

console.log('radar this:', this);
console.log('radar scope:', $scope.$ctrl);
// console.log('new tone:', this.tone);
//
// for (let i = 0; i < this.labels.length; i += 1) {
//   for (let k = 0; k < this.output.length; k += 1) {
//     if (this.output[k].tone_name === this.labels[i]) {
//       this.data[i] = this.output[k].score;
//     }
//   }
// }

})

  .component('radar', {
    bindings: {
      output: '<',
    },
    controller: 'RadarCtrl',
    templateUrl: 'templates/radar.html'
  });
