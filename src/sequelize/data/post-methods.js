const Sequelize = require('sequelize');
const models = require('../models');
const Board = models.Board;
const Card = models.Card;
const History = models.History;
const List = models.List;
const {
	addBoardToUser,
	addListToBoard,
	addCardToList,
	addHistoryToCard,
} = require('./utility-methods');

const createBoard = async (userId, title = '', description = '') => {
	try {
		const board = await Board.create({
			title,
			description,
		});

		const user = await addBoardToUser(userId, board.dataValues.id);

		return {
			board: board.dataValues,
			user,
		};

	} catch (err) {
		throw new Error(err);
	}
};

const createList = async (boardId, title = '', description = '') => {
	try {
		const list = await List.create({
			title,
			description
		});

		const board = await addListToBoard(boardId, list.dataValues.id);

		return {
			list: list.dataValues,
			board,
		};

	} catch (err) {
		throw new Error(err);
	}
};

const createCard = async (
	listId,
	title = '',
	description = '',
	complete = false,
	AssigneeIds = [],
	HistoryIds = []
) => {
	try {
		const card = await Card.create({
			title,
			description,
			complete,
			AssigneeIds,
			HistoryIds,
		});
		const list = await addCardToList(listId, card.dataValues.id);

		return {
			card: card.dataValues,
			list,
		};

	} catch (err) {
		throw new Error(err);
	}
};

const createHistory = async (cardId, text = '') => {
	try {
		const history = await History.create({
			text,
		});

		const card = await addHistoryToCard(cardId, history.dataValues.id);

		return {
			history: history.dataValues,
			card,
		};

	} catch (err) {
		throw new Error(err);
	}
};

module.exports = {
	createBoard,
	createList,
	createCard,
	createHistory,
};
