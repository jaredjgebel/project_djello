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
			res.sendStatus(200).json(response);
		})
		.catch(err => {
			console.error(err);
			res.sendStatus(404).json('NOT FOUND');
		});
});

router.delete('/lists/:id', (req, res) => {
	const listId = req.params.id;

	deleteList(listId)
		.then(response => {
			res.sendStatus(200).json(response);
		})
		.catch(err => {
			console.error(err);
			res.sendStatus(404).json('NOT FOUND');
		});
});

router.delete('/cards/:id', (req, res) => {
	const cardId = req.params.id;
	// keeps submitting body: 'OK' ?????
	deleteCard(cardId)
		.then(response => {
			console.log('Response', response);
			res.sendStatus(200).json({ response });
		})
		.catch(err => {
			console.error(err);
			res.sendStatus(404).json('Card could not be deleted.');
		});
});

module.exports = router;
