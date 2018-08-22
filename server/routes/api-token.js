const express = require('express');
const router = express.Router();
const { getDatabaseToken } = require('../auth');

router.get('/user/access', async (req, res) => {
   const token = await getDatabaseToken();

   if (token) {
      res.status(200).cookie('djello-auth-token', token, {
         // httpOnly: true,
         credentials: "include",
         // must use https
         // turn on during deployment
         // secure: true,
      }).send();
   } else {
      res.status(404).json(err);
   }
});

module.exports = router;