const express = require('express');
const router = express.Router();
const { getDatabaseToken } = require('../auth');

router.get('/user/access', async (req, res) => {
   const token = await getDatabaseToken()
   if (token) {
      res.status(200).json(token);
   } else {
      res.status(404).json(err);
   }
});

module.exports = router;