angular.module('app')
  .service('videoUploader', function ($http) {
    this.upload = (video, callback) => {
      $http.post('http://localhost:3000/api/cloudinary', { video })
        .then(data => callback(null, data))
        .catch(err => callback(err, null));
    };
  });
