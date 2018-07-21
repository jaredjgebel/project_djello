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
const { addHistoryToCard } = require('../../sequelize/data/utility-methods');

describe('Entity delete methods', () => {
	let board, list, card, history, newBoard, newList, newCard, newHistory;

	beforeEach(async () => {
		await clean();

		newBoard = await boardFactory();
		newList = await listFactory();
		newCard = await cardFactory();
		newHistory = await historyFactory();

		board = newBoard.dataValues;
		list = newList.dataValues;
		card = newCard.dataValues;
		history = newHistory.dataValues;

		await addHistoryToCard(card.id, history.id);
	});

	it('deletes a given board', done => {
		deleteBoard(board.id)
			.then(response => {
				expect(response).toBe('Board successfully deleted.');
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});

	it('deletes a given list', done => {
		deleteList(list.id)
			.then(response => {
				expect(response).toBe('List successfully deleted.');
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