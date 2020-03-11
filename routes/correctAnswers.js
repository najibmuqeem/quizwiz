const express = require("express");
const router = express.Router();
const database = require("../db/database");
module.exports = () => {
  //Get correct answers
  router.get("/:id", (req, res) => {
    database
      .getCorrectOptionsForQuiz(req.params.id)
      .then(data => {
        const correctAnswers = data.rows;
        res.json(correctAnswers);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
