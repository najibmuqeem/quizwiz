const express = require('express');
const router = express.Router();
const database = require('../db/database');
module.exports = (db) => {
//Get answers

  router.get('/:id', (req, res) => {
    database.getCorrectOptionsForQuiz(req.params.id).then(data => {
      const answers = data.rows;
      res.json(answers);
    })
      .catch(err => {
        res.json({error: err.message});
      });
  });

  return router;
};
