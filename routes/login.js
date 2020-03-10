const express = require('express');
const router = express.Router();

module.exports = () => {
//Set cookies
  router.post('/', (req, res) => {
    console.log('server api:',req.body.userName);
    req.session.user_name = req.body.userName;
    res.json(req.session.user_name);
  });

  return router;
};

