/* const database = require('../../db/database');

//Add question
const addQuestion = function(req, res, next) {
  database.addQuestionToQuiz(req.body.quiz_id,req.body.question)
    .then(() => next())
    .catch(err => res.json({error: err.message}));

};

//Add options
const addOptions = function(req, res) {
  let options = req.body.options;
  for (let i = 0; i < options.length; i++) {
    database.addOptionToQuestion(req.body.question.question.id, req.body.options[i], req.body.is_correct)
      .then()
      .catch(err => res.json({error: err.message}));
  }
  res.json();
};





module.exports = {
  addQuestion,
  addOptions
};

 */

