angular.module('app')
  .service('userService', function ($http) {
    this.isLoggedIn;
    this.userData = {};

    this.setStatus = () => {
      this.getAllUserData((loggedIn) => {
        this.isLoggedIn = loggedIn;
        if (loggedIn) {
          this.userData = loggedIn;
        }
      });
    };

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