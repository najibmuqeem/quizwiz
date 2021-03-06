const { Pool } = require("pg");

const dbParams = require("../lib/db.js");
const pool = new Pool(dbParams);

// Users

//returns USER object with keys id, username (use res.rows[0])
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

//returns USER object with keys id, username (use res.rows[0])
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

//adds a new user to users database and returns USER object with keys id, username (use res.rows[0])
const addUser = function(username) {
  return pool.query(
    `
      INSERT INTO users (username)
      VALUES ($1)
      RETURNING *;
      `,
    [username]
  );
};
exports.addUser = addUser;

//returns array of USER objects with keys id, username (use res.rows)
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

//returns array of QUIZ objects with keys id, title, description, picture_url, number_of_questions, number_of_plays, user_id, is_public (use res.rows)
const getQuizzes = function(user_id) {
  let queryString = `SELECT
                      quiz_id as id,
                      quizzes.title,
                      quizzes.description,
                      quizzes.picture_url,
                      quizzes.number_of_questions,
                      quizzes.number_of_plays,
                      quizzes.user_id,
                      quizzes.is_public
                    FROM questions
                    JOIN quizzes ON quizzes.id = quiz_id
                    WHERE number_of_questions IS NOT NULL
                    AND number_of_answers IS NOT NULL
                    `;
  if (user_id && Number(user_id) !== 3) {
    queryString += `AND user_id = $1 `;
  }
  queryString += `GROUP BY
                    quiz_id,
                    title,
                    description,
                    picture_url,
                    number_of_questions,
                    number_of_plays,
                    user_id,
                    is_public
                  ORDER BY id DESC;`;

  if (user_id && Number(user_id) !== 3) {
    return pool.query(queryString, [user_id]);
  } else {
    return pool.query(queryString);
  }
};
exports.getQuizzes = getQuizzes;

//returns QUIZ object with keys id, title, description, picture_url, number_of_questions, number_of_plays, user_id, is_public (use res.rows[0])
const getQuiz = function(quiz_id) {
  return pool.query(
    `
    SELECT *
    FROM quizzes
    WHERE id = $1;
    `,
    [quiz_id]
  );
};
exports.getQuiz = getQuiz;

//returns random QUIZ object
const getRandomQuiz = function() {
  return pool.query(
    `
    SELECT *
    FROM quizzes
    WHERE is_public = true
    ORDER BY RANDOM()
    LIMIT 1;
    `
  );
};
exports.getRandomQuiz = getRandomQuiz;

//adds a new quiz to quizzes database and returns all keys of created QUIZ object (use res.rows[0])
const createNewQuiz = function(quiz) {
  return pool.query(
    `
      INSERT INTO quizzes (
        title,
        description,
        picture_url,
        number_of_questions,
        user_id,
        is_public
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
    [
      quiz.title,
      quiz.description,
      quiz.picture_url,
      quiz.number_of_questions,
      quiz.user_id,
      quiz.is_public
    ]
  );
};
exports.createNewQuiz = createNewQuiz;

const removeQuiz = function(quiz_id) {
  return pool.query(
    `
    DELETE FROM quizzes
    WHERE id = $1
    `,
    [quiz_id]
  );
};
exports.removeQuiz = removeQuiz;

// Questions

//adds a new question to questions database and returns keys id, question, and number_of_answers of created QUESTION object
const addQuestionToQuiz = function(quiz_id, question, number_of_answers) {
  return pool.query(
    `
      INSERT INTO questions (quiz_id, question, number_of_answers)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
    [quiz_id, question, number_of_answers]
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

//adds a new option to the options database and returns all keys of created OPTION object
const addOptionToQuestion = function(question_id, option, is_correct) {
  return pool.query(
    `
      INSERT INTO options (question_id, option, is_correct)
      VALUES ($1, $2, $3)
      RETURNING *;
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

//returns array of objects containing questions and options for a particular quiz
const getQuizData = function(quiz_id) {
  return pool.query(
    `
    SELECT *
    FROM options
    JOIN questions ON questions.id = question_id join quizzes on quizzes.id = quiz_id
    WHERE quiz_id = $1;
    `,
    [quiz_id]
  );
};
exports.getQuizData = getQuizData;

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

//adds a new score to the scores database and returns all keys of OPTION object
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

//accepts two parameters. First parameter must be user_id and the second must be quiz_id.
//to get user attempts on all quizzes, pass null as second parameter
//to get user attempts on a specific quiz, pass actual values to both parameters
//to get all user's attempts on a specific quiz, pass null as first parameter
const getUserQuizAttempts = function(user_id, quiz_id) {
  let queryString = `SELECT users.username, count(*) as number_of_quiz_attempts`;
  let queryParams = [];
  if (!user_id) {
    queryString += ` FROM user_scores
    JOIN quizzes ON quizzes.id = quiz_id
    JOIN users on users.id = user_scores.user_id
    GROUP BY user_scores.quiz_id, users.username
    HAVING user_scores.quiz_id = $1;`;
    queryParams.push(quiz_id);
  } else {
    queryString += `, quizzes.title
      FROM user_scores
      JOIN quizzes ON quizzes.id = quiz_id
      JOIN users on users.id = user_scores.user_id
      GROUP BY user_scores.user_id, users.username, quizzes.title
      HAVING user_scores.user_id = $1`;
    queryParams.push(user_id);
    if (quiz_id) {
      queryString += ` AND user_scores.quiz_id = $2;`;
      queryParams.push(quiz_id);
    } else {
      queryString += `;`;
    }
  }
  return pool.query(queryString, queryParams);
};
exports.getUserQuizAttempts = getUserQuizAttempts;

//returns object with keys score and number_of_questions
const getScores = function(user_id, quiz_id) {
  return pool.query(
    `
    SELECT score, quizzes.number_of_questions
    FROM user_scores
    JOIN quizzes ON quizzes.id = quiz_id
    WHERE user_scores.user_id = $1 AND quiz_id = $2
    ORDER BY user_scores.id DESC
    LIMIT 5;
    `,
    [user_id, quiz_id]
  );
};
exports.getScores = getScores;

//returns object with keys score and number_of_questions
const getUserHighScore = function(user_id, quiz_id) {
  return pool.query(
    `
    SELECT score, quizzes.number_of_questions
    FROM user_scores
    JOIN quizzes ON quizzes.id = quiz_id
    WHERE user_scores.user_id = $1 AND quiz_id = $2
    ORDER BY score DESC
    LIMIT 1;
    `,
    [user_id, quiz_id]
  );
};
exports.getUserHighScore = getUserHighScore;

//returns object with keys score and number_of_questions
const getHighestScoreOnQuiz = function(quiz_id) {
  return pool.query(
    `
    SELECT score, quizzes.number_of_questions
    FROM user_scores
    JOIN quizzes ON quizzes.id = quiz_id
    WHERE quiz_id = $1
    ORDER BY score DESC
    LIMIT 1;
    `,
    [user_id, quiz_id]
  );
};
exports.getHighestScoreOnQuiz = getHighestScoreOnQuiz;
