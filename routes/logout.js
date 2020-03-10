const express = require('express');
const router = express.Router();

module.exports = () => {
//Set cookies
  console.log('api call');
  router.post('/', (req, res) => {
    req.session = null;
    res.json("success");
  });

  return router;
};
