const userFactory = require('../factories/User');
const boardFactory = require('../factories/Board');
const listFactory = require('../factories/List');
const cardFactory = require('../factories/Card');
const clean = require('../truncate');
const {
	createBoard,
	createList,
	createCard,
	createHistory,
} = require('../../sequelize/data/post-methods');

describe('Entity creation methods', () => {
	let newUser, newBoard, newList, newCard, user, board, list, card;

	beforeEach(async () => {
		await clean();
		newUser = await userFactory();
		newBoard = await boardFactory();
		newList = await listFactory();
		newCard = await cardFactory();

		user = newUser.dataValues;
		board = newBoard.dataValues;
		list = newList.dataValues;
		card = newCard.dataValues;
	});

	it('creates a board with the given attributes', done => {
		createBoard(user.id, 'Title', 'Description')
			.then(response => {
				expect(response.board.title).toBe('Title');
				expect(response.user.BoardIds).toContain(response.board.id);
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});

	it('creates a list with the given attributes', done => {
		createList(board.id, 'New List', 'Description')
			.then(response => {
				expect(response.list.description).toBe('Description');
				expect(response.board.ListIds).toContain(response.list.id);
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});

	it('creates a card with the given attributes', done => {
		createCard(list.id, 'New Card', 'Card Description')
			.then(response => {
				expect(response.card.title).toBe('New Card');
				expect(response.list.CardIds).toContain(response.card.id);
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});

	it('creates a history with the given attributes', done => {
		// still need to figure out history options
		createHistory(card.id, 'History text')
			.then(response => {
				expect(response.history.text).toBe('History text');
				expect(response.card.HistoryIds).toContain(response.history.id);
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});
});