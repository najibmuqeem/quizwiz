const express = require('express');
const router = express.Router();

module.exports = () => {
//Set cookies
  router.post('/', (req, res) => {
    req.session = null;
    res.json("success");
  });

  return router;
};
