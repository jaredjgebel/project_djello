const Sequelize = require('sequelize');
const models = require('../models');
const User = models.User;
const Board = models.Board;
const Card = models.Card;
const History = models.History;
const List = models.List;
const Op = Sequelize.Op;

// NOTE: returning promises with these methods
// so they can be 'await'ed in post  and delete methods

// Add resource ID to parent resource
const addBoardToUser = async (userId, boardId) => {
	try {
		const userResponse = await User.update({
			BoardIds: Sequelize.fn('array_append', Sequelize.col('BoardIds'), boardId),
		},
			{
				returning: true,
				where: {
					id: userId,
				},
			});


		const user = userResponse[1][0].dataValues;

		return Promise.resolve(user);

	} catch (err) {
		console.error(err);
		return Promise.reject(err);
	}
};

const addListToBoard = async (boardId, listId) => {
	try {
		const boardResponse = await Board.update({
			ListIds: Sequelize.fn('array_append', Sequelize.col('ListIds'), listId)
		},
			{
				returning: true,
				where: {
					id: boardId,
				},
			});

		const board = boardResponse[1][0].dataValues;

		return Promise.resolve(board);
	} catch (err) {
		console.error(err);
		return Promise.reject('List could not be added to board.');
	}
};

const addCardToList = async (listId, cardId) => {
	try {
		const listResponse = await List.update({
			CardIds: Sequelize.fn('array_append', Sequelize.col('CardIds'), cardId),
		},
			{
				returning: true,
				where: {
					id: listId,
				},
			});

		const list = listResponse[1][0].dataValues;

		return Promise.resolve(list);

	} catch (err) {
		console.error(err.errors);
		return Promise.reject('Card was not added to list.');
	}
};

const addAssigneeToCard = async (cardId, userId) => {
	try {
		const cardResponse = await Card.update({
			AssigneeIds: Sequelize.fn('array_append', Sequelize.col('AssigneeIds'), userId),
		},
			{
				returning: true,
				where: {
					id: cardId,
				},
			});

		const card = cardResponse[1][0].dataValues;

		return Promise.resolve(card);

	} catch (err) {
		console.error(err.errors);
		return Promise.reject('Assignee was not added to card.');
	}
};

const addHistoryToCard = async (cardId, historyId) => {
	try {
		const cardResponse = await Card.update({
			HistoryIds: Sequelize.fn('array_append', Sequelize.col('HistoryIds'), historyId),
		},
			{
				returning: true,
				where: {
					id: cardId,
				},
			});

		const card = cardResponse[1][0].dataValues;

		return Promise.resolve(card);

	} catch (err) {
		console.error(err.errors);
		return Promise.reject('Assignee was not added to card.');
	}
}

// Remove id from parent resource
const removeBoardFromUser = async (userId, boardId) => {
	try {
		const response = await User.update({
			BoardIds: Sequelize.fn('array_remove', Sequelize.col('BoardIds'), boardId)
		}, {
				returning: true,
				where: {
					id: userId,
				}
			});

		const user = response[1][0].dataValues;

		return Promise.resolve(user);
	} catch (err) {
		console.error(err);
		return Promise.reject(err);
	}
}

const removeListFromBoard = async (boardId, listId) => {
	try {
		const response = await Board.update({
			ListIds: Sequelize.fn('array_remove', Sequelize.col('ListIds'), listId)
		}, {
				returning: true,
				where: {
					id: boardId,
				}
			})

		const board = response[1][0].dataValues;

		return Promise.resolve(board);
	} catch (err) {
		console.error(err);
		return Promise.reject(err);
	}
}

const removeCardFromList = async (listId, cardId) => {
	try {
		const response = await List.update({
			CardIds: Sequelize.fn('array_remove', Sequelize.col('CardIds'), cardId)
		}, {
				returning: true,
				where: {
					id: listId,
				}
			})

		const list = response[1][0].dataValues;

		return Promise.resolve(list);
	} catch (err) {
		console.error(err);
		return Promise.reject(err);
	}
}


module.exports = {
	addBoardToUser,
	addListToBoard,
	addCardToList,
	addAssigneeToCard,
	addHistoryToCard,
	removeBoardFromUser,
	removeListFromBoard,
	removeCardFromList,
};