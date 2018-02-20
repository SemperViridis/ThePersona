angular.module('app')
  .factory('Interview', function () {
    // Interview Constructor
    function Interview(userId, qAndA, videoUrl, fullTranscript, overallTones, overallPersonality, overallWords) {
      this.userId = userId || null;
      this.qAndA = fullTranscript || {};
      this.videoUrl = videoUrl || null;
      this.fullTranscript = fullTranscript || '';
      this.overallTones = overallTones || [];
      this.overallPersonality = overallPersonality || [];
      this.overallWords = overallWords || [];
    }

    // Constructor Methods
    Interview.prototype.setIntProp = (property, value) => {
      this[property] = value;
    };

    Interview.prototype.getProp = property => this[property];

    Interview.prototype.getInterview = () => this;

    return Interview;
  });
