const { Pool } = require("pg");

const pool = new Pool();

// Users

const getUserWithName = function(name) {
  return pool
    .query(
      `
  SELECT * FROM users
  WHERE name = $1
  `,
      [name]
    )
    .then(res => res.rows[0])
    .catch(err => console.error(err));
};
exports.getUserWithName = getUserWithName;

const getUserWithUsername = function(username) {
  return pool
    .query(
      `
  SELECT * FROM users
  WHERE username = $1
  `,
      [username]
    )
    .then(res => res.rows[0])
    .catch(err => console.error(err));
};
exports.getUserWithUsername = getUserWithUsername;

const getUserWithId = function(id) {
  return pool
    .query(
      `
  SELECT * FROM users
  WHERE id = $1
  `,
      [id]
    )
    .then(res => res.rows[0])
    .catch(err => console.error(err));
};
exports.getUserWithId = getUserWithId;

const addUser = function(user) {
  return pool
    .query(
      `
  INSERT INTO users (
    name, username)
    VALUES (
      $1, $2);
  `,
      [user.name, user.username]
    )
    .then(res => res.rows[0])
    .catch(err => console.error(err));
};
exports.addUser = addUser;

// Quizzes

const getAllQuizzes = function() {
  return pool
    .query(`SELECT * FROM quizzes`)
    .then(res => res.rows)
    .catch(err => console.error(err));
};
exports.getAllQuizzes = getAllQuizzes;

const getUserQuizzes = function(user_id) {
  return pool
    .query(
      `
      SELECT *
      FROM quizzes
      WHERE user_id = $1
  `,
      [user_id]
    )
    .then(res => res.rows)
    .catch(err => console.error(err));
};
exports.getUserQuizzes = getUserQuizzes;

const createNewQuiz = function(quiz) {
  return pool
    .query(
      `
  INSERT INTO quizzes (
    title, description, picture_url, number_of_questions, user_id)
  VALUES (
      $1, $2, $3, $4, $5)
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

const addQuestion = function(quiz_id, question) {
  return pool
    .query(
      `INSERT INTO questions (quiz_id, question) VALUES ($1, $2) RETURNING *;`,
      [quiz_id, question]
    )
    .then(res => res.rows[0])
    .catch(err => console.error(err));
};
exports.addQuestion = addQuestion;

const getQuestions = function(quiz_id) {
  return pool
    .query(`SELECT question FROM questions WHERE quiz_id = $1;`, [quiz_id])
    .then(res => res.rows)
    .catch(err => console.error(err));
};
exports.getQuestions = getQuestions;

// Options

const addOption = function(question_id, option, is_correct) {
  return pool
    .query(
      `INSERT INTO options (question_id, option, is_correct) VALUES ($1, $2, $3) RETURNING *;`,
      [question_id, option, is_correct]
    )
    .then(res => res.rows[0])
    .catch(err => console.error(err));
};
exports.addOption = addOption;

const getOptions = function(question_id) {
  return pool
    .query(
      `SELECT option FROM options JOIN questions ON questions.id = question_id WHERE question_id = $1;`,
      [question_id]
    )
    .then(res => res.rows)
    .catch(err => console.error(err));
};
exports.getOptions = getOptions;

const getCorrectOptions = function(quiz_id) {
  return pool
    .query(
      `SELECT option FROM options JOIN questions ON questions.id = question_id JOIN quizzes ON quizzes.id = quiz_id WHERE is_correct = true AND quiz_id = $1;`,
      [quiz_id]
    )
    .then(res => res.rows)
    .catch(err => console.error(err));
};
exports.getCorrectOptions = getCorrectOptions;

// User Scores

const insertScore = function(quiz_id, user_id, score) {
  return pool
    .query(
      `INSERT INTO user_scores (quiz_id, user_id, score) VALUES ($1, $2, $3) RETURNING *;`,
      [quiz_id, user_id, score]
    )
    .then(res => res.rows[0])
    .catch(err => console.error(err));
};
exports.insertScore = insertScore;
