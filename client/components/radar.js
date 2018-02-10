angular.module('app').controller('RadarCtrl', function ($scope) {
  // this.$onInit = function() {
  // $scope.$on('render Graph', (event) => {
    $scope.labels = ['Anger', 'Fear', 'Sadness', 'Tentative', 'Joy', 'Analytical', 'Confident'];

    $scope.data = [
      [20, 20, 20, 20, 20, 20, 20]
    ];

    console.log('scope', $scope.$ctrl);
    console.log('output on scope:', $scope.$ctrl.output);
    console.log('this', this);
    
    // console.log('overall:', $scope.$ctrl.dope);

    // if ($scope.$ctrl.output.tones) {
    //   for (let i = 0; i < $scope.labels.length; i += 1) {
    //     for (let k = 0; k < $scope.$ctrl.output.tones.length; k += 1) {
    //       if ($scope.$ctrl.output.tones[k].tone_name === $scope.labels[i]) {
    //         $scope.data[0][i] = $scope.$ctrl.output.tones[k].score * 100;
    //         console.log('changed datapoint:', $scope.data[0][i], i);
    //       }
    //     }
    //   }
    // }
    if ($scope.$ctrl.output) {
      console.log('if condition hit')
      for (let i = 0; i < $scope.labels.length; i += 1) {
        for (let k = 0; k < $scope.$ctrl.output.length; k += 1) {
          if ($scope.$ctrl.output[k].tone_name === $scope.labels[i]) {
            $scope.data[0][i] = $scope.$ctrl.output[k].score * 100;
            console.log('changed OVERALL datapoint:', $scope.data[0][i], i);
          }
        }
      }
    }
  // })

})

  .component('radar', {
    bindings: {
      output: '<',
    },
    templateUrl: 'templates/radar.html'
  });
