angular.module('app')
  .service('broadcastService', function ($rootScope) {
    this.send = (msg, data) => {
      $rootScope.$broadcast(msg, data);
    };
  });
