const userFactory = require('../factories/User');
const boardFactory = require('../factories/Board');
const listFactory = require('../factories/List');
const cardFactory = require('../factories/Card');
const historyFactory = require('../factories/History');
const clean = require('../truncate');
const {
	deleteBoard,
	deleteList,
	deleteCard,
} = require('../../sequelize/data/delete-methods');
const {
	addBoardToUser,
	addListToBoard,
	addCardToList,
	addAssigneeToCard,
	addHistoryToCard,
} = require('../../sequelize/data/utility-methods');

describe('Entity delete methods', () => {
	let user, board, list, card, history, newUser, newBoard, newList, newCard, newHistory;

	beforeEach(async () => {
		await clean();

		newUser = await userFactory();
		newBoard = await boardFactory();
		newBoardTwo = await boardFactory();
		newList = await listFactory();
		newCard = await cardFactory();
		newHistory = await historyFactory();

		user = newUser.dataValues;
		board = newBoard.dataValues;
		boardTwo = newBoardTwo.dataValues;
		list = newList.dataValues;
		card = newCard.dataValues;
		history = newHistory.dataValues;

		await addBoardToUser(user.id, board.id);
		await addBoardToUser(user.id, boardTwo.id);
		await addListToBoard(board.id, list.id);
		await addCardToList(list.id, card.id);
		await addAssigneeToCard(card.id, user.id);
		await addHistoryToCard(card.id, history.id);
	});

	it('deletes a given board', done => {
		deleteBoard(user.id, board.id)
			.then(user => {
				expect(user.BoardIds).not.toEqual(jasmine.arrayContaining([board.id]));
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});

	it('deletes a given list', done => {
		deleteList(list.id)
			.then(user => {
				expect(user.BoardIds).not.toEqual(jasmine.arrayContaining(list.id))
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});

	it('deletes a given card and its associated histories', done => {
		deleteCard(card.id)
			.then(response => {
				expect(response).toBe('Card and associated histories successfully deleted.');
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});
});