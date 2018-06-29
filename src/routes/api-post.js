const express = require('express');
const router = express.Router();
const qs = require('qs');
const {
	createBoard,
	createList,
	createCard,
	createHistory,
} = require('../sequelize/data/post-methods');

router.post('/boards/:user_id', (req, res) => {
	const userId = req.params.user_id;
	const q = qs.parse(req.query);
	const title = q.title;
	const description = q.description;

	createBoard(userId, title, description)
		.then(response => {
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err.stack);
			res.status(404).json('Board could not be created.');
		});
});

router.post('/boards/:board_id/lists', (req, res) => {
	const boardId = req.params.board_id;
	const q = req.query;
	const title = q.title;
	const description = q.description;

	createList(boardId, title, description)
		.then(response => {
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(404).json('List could not be created.');
		});
});

router.post('/lists/:list_id/cards', (req, res) => {
	const listId = req.params.list_id;
	const q = qs.parse(req.query);
	const title = q.title;
	const description = q.description;

	createCard(listId, title, description)
		.then(response => {
			res.status(200).json(response);
		})
		.catch(err => {
			console.log(err);
			res.status(404).json('Card could not be created.');
		});
});

router.post('/cards/:card_id/histories', (req, res) => {
	const cardId = req.params.card_id;
	const q = qs.parse(req.query);
	const text = q.text;

	createHistory(cardId, text)
		.then(history => {
			res.status(200).json(history);
		})
		.catch(err => {
			console.log(err);
			res.status(404).json('History could not be created.');
		});
});



module.exports = router;
