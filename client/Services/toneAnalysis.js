angular.module('app')
  .service('toneAnalysis', ($http) => {
    this.toneAnalysis = (transcription, callback) => {
      $http.post('http://localhost:3000/ibmtone', {
        data: {
          text: transcription
        }
      })
        .then(({ data }) => {
          // NEED TO VERIFY FORMAT OF DATA
          if (callback) {
            callback(null, data.document_tone);
          }
        }, ({ data }) => {
          if (callback) {
            callback(data, null);
          }
        });
    };
  });
