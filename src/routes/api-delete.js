const express = require('express');
const router = express.Router();
const {
	deleteBoard,
	deleteList,
	deleteCard,
} = require('../sequelize/data/delete-methods');

router.delete('/boards/:id', (req, res) => {
	const boardId = req.params.id;

	deleteBoard(boardId)
		.then((response) => {
			console.log(response);
			// can't send headers after they are sent error?
			res.sendStatus(200).json('OK');
		})
		.catch(err => {
			console.error(err);
			res.sendStatus(404).json('NOT FOUND');
		});
});

module.exports = router;
