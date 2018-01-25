angular.module('app')
  .component('listItem', {
    bindings: {
      item: '<'
    },
    controller: () => {}, // ask Robin about using arrow function with empty func
    templateUrl: '/templates/list-item.html'
  });
