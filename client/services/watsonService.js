angular.module('app')
  .service('watsonService', function ($http) {
    this.toneAnalysis = (transcription, callback) => {
      $http.post('http://localhost:3000/api/ibmtone', {
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
    this.wordAnalysis = (transcription, callback) => {
      $http.post('http://localhost:3000/api/wordanalysis', {
        data: {
          text: transcription
        }
      })
        .then(({ data }) => {
          // NEED TO VERIFY FORMAT OF DATA
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
