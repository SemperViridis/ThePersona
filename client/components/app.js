angular.module('app')
  .controller('AppCtrl', function (itemsService) {
    itemsService.getAll(function (data) {
      this.items = data;
    });
  })
  .component('app', {
    bindings: {},
    controller: 'AppCtrl',
    templateUrl: '/templates/app.html'
  });
