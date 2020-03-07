const express = require('express');
const router = express.Router();
// const database = require('../db/database');
const {addQuestion, addOptions} = require('./helpers/questionHelper');
module.exports = () => {
  router.post('/', [addQuestion, addOptions]);
  return router;
};
