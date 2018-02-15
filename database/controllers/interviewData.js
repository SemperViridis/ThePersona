const db = require('../../database');

// Function that creates an Interview instance
exports.addInterview = (email, interviewObj, callback) => {
  db.User.find({ where: { email: email } })
    .then((user) => {
      if (user) {
        db.Interview.create({
          response: interviewObj.response,
          videoUrl: interviewObj.videoUrl,
          userId: user.id
        })
          .then((interview) => {
            callback(null, interview);
          })
          .catch((err) => {
            callback(err, null);
          });
      }
      const error = 'No user found';
      callback(error, null);
    })
    .catch((err) => {
      console.error('ERROR IN DB: ', err);
      callback(err, null);
    });
};
