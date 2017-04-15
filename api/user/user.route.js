const express = require('express');
const User = require('./user.model');
const mongoose = require('mongoose')

const router = express.Router();

router.post('/', (req, res) => {

});

router.get('/:username', (req, res) => {
  const findingUsername = req.params.username;
  User.count({
    username: findingUsername
  }).then((count) => {
    if (count > 0) {
      //TODO - Make it more general when we have more information
      res.status(200).json({
        available: 'NO',
        username: findingUsername
      });
    } else {
      res.status(200).json({
        available: 'YES'
      });
    }
  }).catch((err) => {
    console.error(err);
    res.status(500).send({
      error: 'Internal Error'
    });
  });
});



module.exports = router;