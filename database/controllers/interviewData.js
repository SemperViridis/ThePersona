const db = require('../../database');
const bluebird = require('bluebird');

exports.addInterview = (intObj) => {
  return db.Interview.create({
    fullTranscript: intObj.fullTranscript,
    videoUrl: intObj.videoUrl,
    overallTones: intObj.overallTones,
    overallPersonality: intObj.overallPersonality,
    overallWords: intObj.overallWords,
    userId: intObj.userId
  });
};

exports.addAnswers = (intId, answerObj) => {
  return db.Answer.create({
    interviewId: intId,
    answer: answerObj.answer,
    toneAnalysis: answerObj.toneAnalysis,
    personalityAnalysis: answerObj.personalityAnalysis,
    wordAnalysis: answerObj.wordAnalysis,
    promptId: answerObj.question.id,
    userId: answerObj.userId
  });
};

exports.bulkAnswers = (intId, answers) => {
  return bluebird.mapSeries(answers, (answer) => {
    exports.addAnswers(intId, answer[1]);
  });
};

exports.getUserInterviews = (userId) => {
  return db.Interview.findAll({
    where: {
      userId: userId
    }
  });
};

exports.getUserAnswers = (userId) => {
  return db.Answer.findAll({
    where: {
      userId: userId
    },
    include: [{
      model: db.Prompt
    }, {
      model: db.Interview
    }]
  });
};

exports.matchAnswers = (interview) => {
  return db.Answer.findAll({
    where: {
      interviewId: interview.id
    }
  });
};

// exports.getUserInterviews = (userId) => {
//   return db.Interview.findAll({
//     where: {
//       userId: userId
//     }
//   })
//     .then((interviews) => {
//       return bluebird.mapSeries(interviews, (interview) => {
//         exports.matchAnswers(interview.dataValues)
//           .then((answer) => {
//             interview.dataValues.qAndA = answer;
//             console.log('INTERVIEW AFTER MATCH: ', interview);
//           });
//       });
//     })
//     .catch((err) => {
//       console.log('ERROR GETTING INTERVIEWS: ', err);
//     });
// };
