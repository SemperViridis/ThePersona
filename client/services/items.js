angular.module('app')
  .service('itemsService', ($http) => {
    this.getAll = (callback) => {
      $http.get('/items')
        .then((data) => {
          if (callback) {
            callback(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  });
