const express = require("express");
const router = express.Router();
const database = require("../db/database");

module.exports = () => {
  // Add question
  router.post("/", (req, res) => {
    database
      .addQuestionToQuiz(
        req.body.quiz_id,
        req.body.question,
        req.body.number_of_answers
      )
      .then(data => {
        const question = data.rows[0];
        res.json(question);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // Get questions
  router.get("/:id", (req, res) => {
    database
      .getQuizData(req.params.id)
      .then(data => {
        const quizData = data.rows;
        res.json(quizData);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
