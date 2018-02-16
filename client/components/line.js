angular
  .module('app')
  .controller('lineCtrl', function($scope) {
    $scope.labels = ['1', '2', '3', '4', '5'];
    // $scope.onClick = function (points, evt) {
    // console.log(points, evt);
    // };
    $scope.series = ['Analytical', 'Confident', 'Tentative'];

    $scope.data = [
      [55, 70, 65, 88, 95],
      [60, 25, 50, 75, 89],
      [20, 65, 40, 35, 25]
    ];

    $scope.datasetOverride = [{ yAxisID: 'y-axis-1', fill: false }, { yAxisID: 'y-axis-2', fill: false }, { fill: false }];

    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          fontSize: 17
        }
      }
    };

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

  .component('line', {
    bindings: {
      output: '<'
    },
    templateUrl: 'templates/line.html'
  });
