const express = require('express');
const router = express.Router();
const models = require('../src/sequelize/models');
const User = models.User;
const {
	getUser,
	getUserBoards,
	getLists,
	getCards,
	getHistories,
	getCardAssignees
} = require('../src/sequelize/data-methods');

// GET current user info
router.get('/users/:id', async (req, res) => {
	// will get from auth token
	const userId = req.params.id;

	getUser(userId)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(err => {
			console.log(err.stack);
			res.status(400).json('User not found.');
		})
});

// GET all boards for given user
router.get('/boards', (req, res) => {
	// get userId from auth token
	const userId = 100;

	getUserBoards(userId)
		.then(boards => {
			res.status(200).json(boards);
		})
		.catch(err => {
			console.log(err.stack);
			res.status(404).json('Board not found.');
		});
})

// GET all lists for given board
router.get('/boards/:board_id/lists', (req, res) => {
	const boardId = req.params.board_id;

	getList(boardId)
		.then(histories => {
			res.status(200).json(histories);

		})
		.catch(err => {
			console.log(err.stack);
			res.status(404).json('List not found.');
		});
});

// GET all cards AND card assignees for given list
router.get('/lists/:list_id/cards', (req, res) => {
	const listId = req.params.list_id;

	getCards(listId)
		.then(async (cards) => {
			const assignees = [];
			for (let card of cards) {
				const assignee = await getCardAssignees(card.id);
				assignees.push(assignee);
			}

			res.status(200).json([cards, assignees]);
		})
		.catch(err => {
			console.log(err.stack);
			res.status(404).json('Card not found.');
		});
});

// GET all histories for given card
router.get('/cards/:card_id/histories', (req, res) => {
	const cardId = req.params.card_id;

	getHistories(cardId)
		.then(histories => {
			res.status(200).json(histories);
		})
		.catch(err => {
			console.log(err.stack);
			res.status(404).json('Card not found.');
		});
})


module.exports = router;

