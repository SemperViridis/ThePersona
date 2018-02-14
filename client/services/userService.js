angular.module('app')
  .service('userService', function ($http, broadcastService) {
    this.isLoggedIn = false;
    this.userData = {};

    this.getAllUserData = (callback) => {
      $http.get('/data/user')
        .then(({ data }) => {
          if (callback) {
            callback(null, data);
          }
        }, ({ data }) => {
          if (callback) {
            callback(data, null);
          }
        });
    };
  });
