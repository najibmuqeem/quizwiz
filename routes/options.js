const express = require("express");
const router = express.Router();
const database = require("../db/database");

module.exports = () => {
  // Add  options
  router.post("/", (req, res) => {
    database
      .addOptionToQuestion(
        req.body.question_id,
        req.body.option,
        req.body.is_correct
      )
      .then(data => {
        const option = data.rows[0];
        res.json(option);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  // Get Options
  router.get("/:id", (req, res) => {
    database
      .getOptionsForQuestion(req.params.id)
      .then(data => {
        const options = data.rows;
        res.json(options);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
