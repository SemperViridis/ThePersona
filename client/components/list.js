angular.module('app')
  .component('list', {
    bindings: {
      items: '<'
    },
    controller: function () {}, // ask Robin about using arrow function with empty func
    templateUrl: '/templates/list.html'
  });
