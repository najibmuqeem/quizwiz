const express = require('express');
const router = express.Router();
const database = require('../db/database');

module.exports = () => {
//Post scores
  router.post('/', (req, res) => {
    database.insertScore(req.body.quiz_id,req.body.user_id,req.body.score).then(data => {
      const scores = data.rows;
      res.json(scores);
    })
      .catch(err => {
        res.status(500).json({error: err.message});
      });
  });

  // Get scores
  router.get('/', (req, res) => {
    database.getScores(req.body.user_id,req.body.quiz_id).then(data => {
      const scores = data.rows;
      res.json(scores);
    })
      .catch(err => {
        res.status(500).json({error: err.message});
      });
  });


  return router;
};
