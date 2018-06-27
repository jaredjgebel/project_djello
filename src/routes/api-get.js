const express = require('express');
const router = express.Router();
const {
	getUser,
	getUserBoards,
	getBoard,
	getList,
	getLists,
	getCard,
	getCards,
	getHistory,
	getHistories,
	getCardAssignees
} = require('../sequelize/data/get-methods');

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
			res.status(404).json('User not found.');
		})
});

// get a single board
router.get('/boards/:id', (req, res) => {
	const boardId = req.params.id;

	getBoard(boardId)
		.then(board => {
			res.status(200).json(board);
		})
		.catch(err => {
			console.log(err.stack);
			res.status(404).json('Board not found.');
		});
});

// GET all boards for given user
router.get('/users/:user_id/boards', (req, res) => {
	// get userId from auth token
	const userId = req.params.user_id;

	getUserBoards(userId)
		.then(boards => {
			console.log('Boards', boards);
			if (boards) {
				res.status(200).json(boards);
			} else {
				res.status(200).json('User has no boards.');
			}
		})
		.catch(err => {
			console.log(err.stack);
			res.status(404).json('Board not found.');
		});
})

// get a single list
router.get('/lists/:id', (req, res) => {
	const listId = req.params.id;

	getList(listId)
		.then(list => {
			res.status(200).json(list);
		})
		.catch(err => {
			console.log(err.stack);
			res.status(404).json('List not found.');
		});
})

// GET all lists for given board
router.get('/boards/:board_id/lists', (req, res) => {
	const boardId = req.params.board_id;

	getLists(boardId)
		.then(lists => {
			console.log('lists', lists);
			res.status(200).json(lists);

		})
		.catch(err => {
			console.log(err);
			res.status(404).json('List not found.');
		});
});

// get information for a single card
router.get('/cards/:card_id', (req, res) => {
	const cardId = req.params.card_id;

	getCard(cardId)
		.then(card => {
			res.status(200).json(card);
		})
		.catch(err => {
			console.log(err);
			res.status(404).json('List not found.');
		});
});

// GET all cards AND card assignees for given list
router.get('/lists/:list_id/cards', (req, res) => {
	const listId = req.params.list_id;

	getCards(listId)
		.then(async (cards) => {
			console.log('CARDZ', cards);

			const cardsResponse = [];
			for (let card of cards) {
				const assignees = await getCardAssignees(card.id);

				const obj = {
					card,
					assignees,
				};

				cardsResponse.push(obj);
			}

			res.status(200).json(cardsResponse);
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
});

// get a single history
router.get('/histories/:id', (req, res) => {
	const historyId = req.params.id;

	getHistory(historyId)
		.then(history => {
			console.log('HISTORY', history);
			res.status(200).json(history);
		})
		.catch(err => {
			console.log(err.stack);
			res.status(404).json('History not found.');
		});
});

module.exports = router;

