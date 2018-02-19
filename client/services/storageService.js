angular.module('app')
  .service('storageService', function () {
    this.currentResults = {
      id: 1,
      createdAt: new Date().toLocaleDateString(),
      url: null
    };
  });
