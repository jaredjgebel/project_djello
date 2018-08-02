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
	let user, board, list, card, history, newUser, newBoard, newList, newCard, newHistory, newBoardTwo, newListTwo, newCardTwo, newHistoryTwo;

	beforeEach(async () => {
		await clean();

		newUser = await userFactory();
		newBoard = await boardFactory();
		newBoardTwo = await boardFactory();
		newList = await listFactory();
		newListTwo = await listFactory();
		newCard = await cardFactory();
		newCardTwo = await cardFactory();
		newHistory = await historyFactory();
		newHistoryTwo = await historyFactory();

		user = newUser.dataValues;
		board = newBoard.dataValues;
		boardTwo = newBoardTwo.dataValues;
		list = newList.dataValues;
		listTwo = newListTwo.dataValues;
		card = newCard.dataValues;
		cardTwo = newCardTwo.dataValues;
		history = newHistory.dataValues;
		historyTwo = newHistoryTwo.dataValues;

		// creating two of each to ensure that one
		// remains and one is deleted
		await addBoardToUser(user.id, board.id);
		await addBoardToUser(user.id, boardTwo.id);
		await addListToBoard(board.id, list.id);
		await addListToBoard(board.id, listTwo.id);
		await addCardToList(list.id, card.id);
		await addCardToList(list.id, cardTwo.id);
		await addAssigneeToCard(card.id, user.id);
		await addHistoryToCard(card.id, history.id);
		await addHistoryToCard(card.id, historyTwo.id);
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
		deleteList(board.id, list.id)
			.then(board => {
				expect(board.ListIds).not.toEqual(jasmine.arrayContaining([list.id]))
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});

	it('deletes a given card and its associated histories', done => {
		deleteCard(list.id, card.id)
			.then(list => {
				expect(list).not.toEqual(jasmine.arrayContaining([card.id]));
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});
});