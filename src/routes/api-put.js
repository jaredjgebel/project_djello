const express = require('express');
const router = express.Router();
const qs = require('qs');
const {
	editBoard,
	editList,
	editCard,
} = require('../sequelize/data/put-methods');

router.put('/boards', (req, res) => {
	const q = qs.parse(req.query);
	const boardId = q.id;
	const title = q.title;
	const description = q.description;

	editBoard(boardId, title, description)
		.then(board => {
			res.status(200).json(board);
		})
		.catch(err => {
			console.log(err.stack);
			res.status(404).json('Board could not be edited');
		});
});

router.put('/lists/:id', (req, res) => {
	const listId = req.params.id;
	const q = qs.parse(req.query);
	const title = q.title;
	const description = q.description;

	editList(listId, title, description)
		.then(list => {
			res.status(200).json(list);
		})
		.catch(err => {
			console.log(err);
			res.status(404).json('List was not edited.');
		});
});

router.put('/cards/:id', (req, res) => {
	const cardId = req.params.id;
	const q = qs.parse(req.query);
	const title = q.title;
	const description = q.description;

	editCard(cardId, title, description)
		.then(card => {
			res.status(200).json(card);
		})
		.catch(err => {
			console.log(err);
			res.status(404).json('Card was not edited.');
		});
});

module.exports = router;