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
    const params = {
      title: req.body.title,
      description: req.body.description,
      picture_url: req.body.picture_url,
      number_of_questions: req.body.number_of_questions,
      user_id: req.body.user_id,
      is_public: req.body.is_public
    };
    database
      .createNewQuiz(params)
      .then(data => {
        const quizzes = data.rows;
        res.json(quizzes);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // Get user's quizzes
  router.get("/single/:uid", (req, res) => {
    database
      .getQuizzes(req.params.uid)
      .then(data => {
        const quizzes = data.rows;
        res.json(quizzes);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  //Delete quiz
  router.delete("/delete/:id", (req, res) => {
    database
      .removeQuiz(req.params.id)
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // Get a random quiz
  router.get("/random", (req, res) => {
    database
      .getRandomQuiz()
      .then(data => {
        const quiz = data.rows[0];
        res.json(quiz);
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
