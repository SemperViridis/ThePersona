const db = require('../../database');

exports.addInterview = (interviewObj) => {
  db.User.find({ where: { email: email } })
    .then((user) => {
      return db.Interview.create({
        response: interviewObj.response,
        videoUrl: interviewObj.videoUrl,
        userId: user.id
      });
    })
    .catch((err) => {
      console.error('ERROR IN DB: ', err);
    });
};
