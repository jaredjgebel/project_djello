const express = require('express');
const router = express.Router();
const { checkJwt } = require('../auth');
const {
	deleteBoard,
	deleteList,
	deleteCard,
} = require('../../src/sequelize/data/delete-methods');

router.delete('/boards/:id', checkJwt, (req, res) => {
	const boardId = req.params.id;

	deleteBoard(boardId)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch(err => {
			console.error(err);
			res.status(404).json('NOT FOUND');
		});
});

router.delete('/lists/:id', checkJwt, (req, res) => {
	const listId = req.params.id;

	deleteList(listId)
		.then(response => {
			res.status(200).json(response);
		})
		.catch(err => {
			console.error(err);
			res.status(404).json('NOT FOUND');
		});
});

router.delete('/cards/:id', checkJwt, (req, res) => {
	const cardId = req.params.id;
	// keeps submitting body: 'OK' ?????
	deleteCard(cardId)
		.then(response => {
			console.log('Response', response);
			res.status(200).json({ response });
		})
		.catch(err => {
			console.error(err);
			res.status(404).json('Card could not be deleted.');
		});
});

module.exports = router;
