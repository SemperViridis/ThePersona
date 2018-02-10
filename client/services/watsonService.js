angular.module('app')
  .service('watsonService', function ($http, broadcastService) {

    this.responses = []
    this.answerAnalysis = [];
    this.answerFillers = []
    this.interviewAnalysis = [];
    this.interviewFillers = [];

    this.analyzeAnswer = (answer) => {
      this.responses.push(answer)
      this.toneAnalysis(answer, (err, results) => {
        if (err) { throw new Error(err) }
        this.answerAnalysis.push(results);
        // broadcastService.send('render');
        // console.log('tone anaylsis:', this.answerAnalysis);
      })


      this.wordAnalysis(answer, (err, results) => {
        if (err) { throw new Error(err) }
        // console.log('word anaylsis:', this.answerFillers);
        this.answerFillers.push(results);
      });
    }

    this.analyzeInterview = (interview) => {
      console.log('this is the interview', interview);
      this.toneAnalysis(interview, (err, results) => {
        if (err) { throw new Error(err) }
        this.interviewAnalysis.push(results)
        console.log('interview tone Analysis:', results);
        console.log('interview Array:', this.interviewAnalysis);
        setTimeout(broadcastService.send('render'), 50);
      });

      this.wordAnalysis(interview, (err, results) => {
        if (err) { throw new Error(err) }
        this.interviewFillers.push(results);
        // console.log('interview word Analysis:', results);
      });

    }

    this.toneAnalysis = (transcription, callback) => {
      $http.post('http://localhost:3000/api/ibmtone', {
        data: {
          text: transcription
        }
      })
        .then(({ data }) => {
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
