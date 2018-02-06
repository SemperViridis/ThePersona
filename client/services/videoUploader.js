angular.module('app')
  .service('videoUploader', function ($http) {
    this.upload = (video, callback) => {
      $http.post('http://localhost:3000/api/cloudinary', { video })
        .then(res => callback(null, res))
        .catch(err => callback(err, null));
    };
  });
