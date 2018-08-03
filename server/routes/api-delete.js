const express = require('express');
const router = express.Router();
const { checkJwt } = require('../auth');
const {
	deleteBoard,
	deleteList,
	deleteCard,
} = require('../../src/sequelize/data/delete-methods');

router.delete('/users/:user_id/boards/:board_id', checkJwt, (req, res) => {
	const boardId = req.params.board_id;
	const userId = req.params.user_id;

	deleteBoard(userId, boardId)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch(err => {
			console.error(err);
			res.status(404).json('NOT FOUND');
		});
});

router.delete('/boards/:board_id/lists/:list_id', checkJwt, (req, res) => {
	const listId = req.params.list_id;
	const boardId = req.params.board_id;

	deleteList(boardId, listId)
		.then(board => {
			res.status(200).json(board);
		})
		.catch(err => {
			console.error(err);
			res.status(404).json('NOT FOUND');
		});
});

router.delete('lists/:list_id/cards/:card_id', checkJwt, (req, res) => {
	const cardId = req.params.card_id;
	const listId = req.params.list_id;

	deleteCard(listId, cardId)
		.then(list => {
			res.status(200).json(list);
		})
		.catch(err => {
			console.error(err);
			res.status(404).json('Card could not be deleted.');
		});
});

module.exports = router;
