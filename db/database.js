const { Pool } = require("pg");

const pool = new Pool();

// Users

//returns USER object with keys id, name, username
const getUserWithName = function(name) {
  return pool
    .query(
      `
      SELECT *
      FROM users
      WHERE name = $1;
      `,
      [name]
    )
    .then(res => res.rows[0])
    .catch(err => console.error(err));
};
exports.getUserWithName = getUserWithName;

//returns USER object with keys id, name, username
const getUserWithUsername = function(username) {
  return pool
    .query(
      `
      SELECT *
      FROM users
      WHERE username = $1;
      `,
      [username]
    )
    .then(res => res.rows[0])
    .catch(err => console.error(err));
};
exports.getUserWithUsername = getUserWithUsername;

//returns USER object with keys id, name, username
const getUserWithId = function(id) {
  return pool
    .query(
      `
      SELECT *
      FROM users
      WHERE id = $1;
      `,
      [id]
    )
    .then(res => res.rows[0])
    .catch(err => console.error(err));
};
exports.getUserWithId = getUserWithId;

//adds a new user to users database and returns USER object with keys id, name, username
const addUser = function(user) {
  return pool
    .query(
      `
      INSERT INTO users (name, username)
      VALUES ($1, $2)
      RETURNING *;
      `,
      [user.name, user.username]
    )
    .then(res => res.rows[0])
    .catch(err => console.error(err));
};
exports.addUser = addUser;

//returns array of USER objects with keys id, name, username
const getUsersWithPlaysOnQuiz = function(quiz_id) {
  return pool
    .query(
      `
      SELECT *
      FROM users
      JOIN user_scores ON user_scores.user_id = users.id
      WHERE user_scores.quiz_id = $1;
      `,
      [quiz_id]
    )
    .then(res => res.rows)
    .catch(err => console.error(err));
};
exports.getUsersWithPlaysOnQuiz = getUsersWithPlaysOnQuiz;

// Quizzes

//returns array of QUIZ objects with keys id, title, description, picture_url, number_of_questions, number_of_plays, user_id
const getQuizzes = function(user_id) {
  let queryString = `SELECT * FROM quizzes`;
  if (user_id) {
    queryString += `WHERE user_id = $1;`;
    return pool
      .query(queryString, [user_id])
      .then(res => res.rows)
      .catch(err => console.error(err));
  } else {
    queryString += `;`;
    return pool
      .query(queryString)
      .then(res => res.rows)
      .catch(err => console.error(err));
  }
};
exports.getQuizzes = getQuizzes;

//adds a new quiz to quizzes database and returns QUIZ Object with keys id, title, description, picture_url, number_of_questions, number_of_plays, user_id
const createNewQuiz = function(quiz) {
  return pool
    .query(
      `
      INSERT INTO quizzes (
        title,
        description,
        picture_url,
        number_of_questions,
        user_id
      )
      VALUES ($1, $2, $3, $4, $5);
      RETURNING *;
      `,
      [
        quiz.title,
        quiz.description,
        quiz.picture_url,
        quiz.number_of_questions,
        quiz.user_id
      ]
    )
    .then(res => res.rows[0])
    .catch(err => console.error(err));
};
exports.createNewQuiz = createNewQuiz;

// Questions

//adds a new question to questions database and returns QUESTION object with keys id, quiz_id, question, number_of_answers
const addQuestionToQuiz = function(quiz_id, question) {
  return pool
    .query(
      `
      INSERT INTO questions (quiz_id, question)
      VALUES ($1, $2);
      `,
      [quiz_id, question]
    )
    .then(res => res.rows[0])
    .catch(err => console.error(err));
};
exports.addQuestionToQuiz = addQuestionToQuiz;

//returns array of QUESTION objects with keys id, quiz_id, question, number_of_answers
const getQuestionsForQuiz = function(quiz_id) {
  return pool
    .query(
      `
      SELECT *
      FROM questions
      WHERE quiz_id = $1;
      `,
      [quiz_id]
    )
    .then(res => res.rows)
    .catch(err => console.error(err));
};
exports.getQuestionsForQuiz = getQuestionsForQuiz;

// Options

//adds a new option to the options database and returns OPTION object with keys id, question_id, option, is_correct
const addOptionToQuestion = function(question_id, option, is_correct) {
  return pool
    .query(
      `
      INSERT INTO options (question_id, option, is_correct)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [question_id, option, is_correct]
    )
    .then(res => res.rows[0])
    .catch(err => console.error(err));
};
exports.addOptionToQuestion = addOptionToQuestion;

//returns array of OPTION objects with keys id, question_id, option, is_correct
const getOptionsForQuestion = function(question_id) {
  return pool
    .query(
      `
      SELECT *
      FROM options
      JOIN questions ON questions.id = question_id
      WHERE question_id = $1;
      `,
      [question_id]
    )
    .then(res => res.rows)
    .catch(err => console.error(err));
};
exports.getOptionsForQuestion = getOptionsForQuestion;

//returns array of OPTION objects with keys id, question_id, option, is_correct
const getCorrectOptionsForQuiz = function(quiz_id) {
  return pool
    .query(
      `
      SELECT *
      FROM options
      JOIN questions ON questions.id = question_id
      JOIN quizzes ON quizzes.id = quiz_id
      WHERE is_correct = true
      AND quiz_id = $1;
      `,
      [quiz_id]
    )
    .then(res => res.rows)
    .catch(err => console.error(err));
};
exports.getCorrectOptionsForQuiz = getCorrectOptionsForQuiz;

// User Scores

//adds a new score to the scores database and returns OPTION object with keys id, question_id, option, is_correct
const insertScore = function(quiz_id, user_id, score) {
  return pool
    .query(
      `
      INSERT INTO user_scores (quiz_id, user_id, score)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [quiz_id, user_id, score]
    )
    .then(res => res.rows[0])
    .catch(err => console.error(err));
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
