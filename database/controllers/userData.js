const db = require('../../database');

exports.userByEmail = function (email, callback) {
  db.User.find({ where: { email: email } })
    .then((user) => {
      if (user) {
        db.Answer.find({ where: { userID: user.id }})
          .then ((answer) => {
            user.answers = answer;
           return db.Prompt.find({ where: { id: answer.promptId }})
           .then((prompts) => {
             user.prompts = prompts;
           })
          })
      }
      callback(null, user);
    })
    .catch((err) => {
      callback(err, null);
    });
};

exports.createAnswer = function (email, promptid, reply, callback) {
  db.User.find({ where: { email: email } })
    .then((user) => {
      return db.Prompt.find({ where: { id: promptid } })
      .then(prompt => {
        return db.Answer.create({
          userId: user.id,
          promptId: promptid,
          response: reply
        })
      })
    })
    .then((a) => {
      userByEmail(email, callback);
    })
    .catch((err) => {
      callback(err, null);
    })
};

