angular.module('app').controller('BarLangCtrl', function ($scope) {
  $scope.labels = ['Analytical', 'Confident', 'Tentative'];

  $scope.series = ['Language'];

  $scope.data = [
    [1, 1, 1]
  ];

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
})

  .component('barLang', {
    bindings: {
      output: '<',
    },
    templateUrl: 'templates/barLang.html'
  });
