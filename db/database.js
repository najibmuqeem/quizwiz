const { Pool } = require("pg");

const dbParams = require("../lib/db.js");
const pool = new Pool(dbParams);

// Users

//returns USER object with keys id, name, username (use res.rows[0])
const getUserWithName = function(name) {
  return pool.query(
    `
      SELECT *
      FROM users
      WHERE name = $1;
      `,
    [name]
  );
};
exports.getUserWithName = getUserWithName;

//returns USER object with keys id, name, username (use res.rows[0])
const getUserWithUsername = function(username) {
  return pool.query(
    `
      SELECT *
      FROM users
      WHERE username = $1;
      `,
    [username]
  );
};
exports.getUserWithUsername = getUserWithUsername;

//returns USER object with keys id, name, username (use res.rows[0])
const getUserWithId = function(id) {
  return pool.query(
    `
      SELECT *
      FROM users
      WHERE id = $1;
      `,
    [id]
  );
};
exports.getUserWithId = getUserWithId;

//adds a new user to users database and returns USER object with keys id, name, username (use res.rows[0])
const addUser = function(user) {
  return pool.query(
    `
      INSERT INTO users (name, username)
      VALUES ($1, $2)
      RETURNING *;
      `,
    [user.name, user.username]
  );
};
exports.addUser = addUser;

//returns array of USER objects with keys id, name, username (use res.rows)
const getUsersWithPlaysOnQuiz = function(quiz_id) {
  return pool.query(
    `
      SELECT *
      FROM users
      JOIN user_scores ON user_scores.user_id = users.id
      WHERE user_scores.quiz_id = $1;
      `,
    [quiz_id]
  );
};
exports.getUsersWithPlaysOnQuiz = getUsersWithPlaysOnQuiz;

// Quizzes

//returns array of QUIZ objects with keys id, title, description, picture_url, number_of_questions, number_of_plays, user_id (use res.rows)
const getQuizzes = function(user_id) {
  let queryString = `SELECT * FROM quizzes`;
  if (user_id) {
    queryString += `WHERE user_id = $1;`;
    return pool.query(queryString, [user_id]);
  } else {
    queryString += `;`;
    return pool.query(queryString);
  }
};
exports.getQuizzes = getQuizzes;

//adds a new quiz to quizzes database and returns id key of created QUIZ object (use res.rows[0])
const createNewQuiz = function(quiz) {
  return pool.query(
    `
      INSERT INTO quizzes (
        title,
        description,
        picture_url,
        number_of_questions,
        user_id
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
      `,
    [
      quiz.title,
      quiz.description,
      quiz.picture_url,
      quiz.number_of_questions,
      quiz.user_id
    ]
  );
};
exports.createNewQuiz = createNewQuiz;

// Questions

//adds a new question to questions database and returns id key of created QUESTION object
const addQuestionToQuiz = function(quiz_id, question) {
  return pool.query(
    `
      INSERT INTO questions (quiz_id, question)
      VALUES ($1, $2)
      RETURNING id;
      `,
    [quiz_id, question]
  );
};
exports.addQuestionToQuiz = addQuestionToQuiz;

//returns array of QUESTION objects with keys id, quiz_id, question, number_of_answers
const getQuestionsForQuiz = function(quiz_id) {
  return pool.query(
    `
      SELECT *
      FROM questions
      WHERE quiz_id = $1;
      `,
    [quiz_id]
  );
};
exports.getQuestionsForQuiz = getQuestionsForQuiz;

// Options

//adds a new option to the options database and returns id of created OPTION object
const addOptionToQuestion = function(question_id, option, is_correct) {
  return pool.query(
    `
      INSERT INTO options (question_id, option, is_correct)
      VALUES ($1, $2, $3)
      RETURNING id;
      `,
    [question_id, option, is_correct]
  );
};
exports.addOptionToQuestion = addOptionToQuestion;

//returns array of OPTION objects with keys id, question_id, option, is_correct
const getOptionsForQuestion = function(question_id) {
  return pool.query(
    `
      SELECT *
      FROM options
      JOIN questions ON questions.id = question_id
      WHERE question_id = $1;
      `,
    [question_id]
  );
};
exports.getOptionsForQuestion = getOptionsForQuestion;

//returns array of OPTION objects with keys id, question_id, option, is_correct
const getCorrectOptionsForQuiz = function(quiz_id) {
  return pool.query(
    `
      SELECT *
      FROM options
      JOIN questions ON questions.id = question_id
      JOIN quizzes ON quizzes.id = quiz_id
      WHERE is_correct = true
      AND quiz_id = $1;
      `,
    [quiz_id]
  );
};
exports.getCorrectOptionsForQuiz = getCorrectOptionsForQuiz;

// User Scores

//adds a new score to the scores database and returns OPTION object with keys id, question_id, option, is_correct
const insertScore = function(quiz_id, user_id, score) {
  return pool.query(
    `
      INSERT INTO user_scores (quiz_id, user_id, score)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
    [quiz_id, user_id, score]
  );
};
exports.insertScore = insertScore;

//
// will implement later if time permits
//
// const makeQuery = function(queryString, queryParams) {
//   if (queryParams) {
//     return pool.query(queryString, queryParams);
//   } else {
//     return pool.query(queryString);
//   }
// };
