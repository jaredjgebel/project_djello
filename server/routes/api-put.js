const express = require('express');
const router = express.Router();
const qs = require('qs');
const { checkJwt } = require('../auth');
const {
	editBoard,
	editList,
	editCard,
} = require('../../src/sequelize/data/put-methods');
const { addAssigneeToCard } = require('../../src/sequelize/data/utility-methods')

router.put('/boards/:id', checkJwt, (req, res) => {
	const boardId = req.params.id;
	const q = qs.parse(req.query);
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

router.put('/lists/:id', checkJwt, (req, res) => {
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

router.put('/cards/:id', checkJwt, (req, res) => {
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

router.put('/addassignee/:card_id/:user_id', checkJwt, (req, res) => {
	const cardId = req.params.card_id;
	const userId = req.params.user_id;

	addAssigneeToCard(cardId, userId)
		.then(card => {
			res.status(200).json(card);
		})
		.catch(err => {
			console.log(err);
			res.status(404).json('Assignee not added to card.');
		});
});

module.exports = router;