const express = require('express');
const router = express.Router();
module.exports = () => {
//Reset cookies
  router.post('/', (req, res) => {
    req.session = null;
    res.json("success");
  });

  return router;
};
