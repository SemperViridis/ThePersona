angular.module('app')
  .controller('AppCtrl', (itemsService) => {
    itemsService.getAll((data) => {
      this.items = data;
    });
  })
  .component('app', {
    bindings: {},
    controller: 'AppCtrl',
    templateUrl: '/templates/app.html'
  });
