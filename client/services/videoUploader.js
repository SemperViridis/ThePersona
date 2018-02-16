angular.module('app')
  .service('videoUploader', function ($http) {
    this.upload = (video, callback) => {
      $http.post('/api/cloudinary', { video })
        .then(res => callback(null, res))
        .catch(err => callback(err, null));
    };
  });
