const express = require('express');
const router = express.Router();
const {
   createBoard,
   createList,
   createCard,
   createHistory,
} = require('../sequelize/data/post-methods');

router.post('/boards/:user_id', (req, res) => {
   const userId = req.params.user_id;

   createBoard(userId)
      .then(board => {
         res.status(200).json(board);
      })
      .catch(err => {
         console.log(err.stack);
         res.status(404).json('Board could not be created.');
      });
});

module.exports = router;
