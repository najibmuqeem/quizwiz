const express = require("express");
const router = express.Router();
const database = require("../db/database");

module.exports = () => {
  // Get quizzes
  router.get("/", (req, res) => {
    database
      .getQuizzes()
      .then(data => {
        const quizzes = data.rows;
        res.json(quizzes);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  //Post quiz

  router.post("/", (req, res) => {
    console.log({ body: req.body });
    database
      .createNewQuiz({
        title: req.body.title,
        description: req.body.description,
        picture_url: req.body.picture_url,
        number_of_questions: req.body.number_of_questions,
        user_id: req.body.user_id,
        is_public: req.body.is_public
      })
      .then(data => {
        const quizzes = data.rows;
        res.json(quizzes);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  //Get a single quiz

  router.get("/:id", (req, res) => {
    database
      .getQuiz(req.params.id)
      .then(data => {
        const quiz = data.rows[0];
        res.json(quiz);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
