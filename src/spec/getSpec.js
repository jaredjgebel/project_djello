const app = require('../../server');
const userFactory = require('./factories/User');
const boardFactory = require('./factories/Board');
const listFactory = require('./factories/List');
const cardFactory = require('./factories/Card');
const historyFactory = require('./factories/History');
const clean = require('./truncate');
const {
	getUser,
	getUserBoards,
	getLists,
	getCards,
	getHistories,
	getCardAssignees,
} = require('../sequelize/data/get-methods');
const {
	addBoardToUser,
	addListToBoard,
	addCardToList,
	addAssigneeToCard,
	addHistoryToCard,
} = require('../sequelize/data/utility-methods');


describe('Database retrieval methods', () => {
	let user, board, list, card, history;

	beforeEach(async () => {
		await clean();

		user = await userFactory();
		board = await boardFactory();
		list = await listFactory();
		card = await cardFactory();
		history = await historyFactory();

		await addBoardToUser(user.dataValues.id, board.dataValues.id);
		await addListToBoard(board.dataValues.id, list.dataValues.id);
		await addCardToList(list.dataValues.id, card.dataValues.id);
		await addAssigneeToCard(card.dataValues.id, user.dataValues.id);
		await addHistoryToCard(card.dataValues.id, history.dataValues.id);
	});

	xit('retrieves a user with a given id', done => {
		getUser(user.dataValues.id)
			.then(response => {
				expect(user.dataValues.id).toEqual(response.id);
				expect(user.dataValues.first).toBe(response.first);
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});

	xit('retrieves the boards for a given user', done => {
		getUserBoards(user.dataValues.id)
			.then(response => {
				expect(response[0].id).toBe(board.dataValues.id);
				expect(response[0].title).toBe(board.dataValues.title);
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});

	xit('retrieves the lists for a given board', done => {
		getLists(board.dataValues.id)
			.then(response => {
				expect(response[0].id).toBe(list.dataValues.id);
				expect(response[0].title).toBe(list.dataValues.title);
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});


	xit('retrieves the cards for a given list', done => {
		getCards(list.dataValues.id)
			.then(response => {
				expect(response[0].id).toBe(card.dataValues.id);
				expect(response[0].title).toBe(card.dataValues.title);
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});

	xit('retrieves the assignees for a given card', done => {
		getCardAssignees(card.dataValues.id)
			.then(response => {
				expect(response[0].id).toBe(user.dataValues.id);
				expect(response[0].first).toBe(user.dataValues.first);
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});

	xit('retrieves the histories for a given card', done => {
		getHistories(card.dataValues.id)
			.then(response => {
				expect(response[0].id).toBe(history.dataValues.id);
				expect(response[0].text).toBe(history.dataValues.text);
				done();
			})
			.catch(err => {
				throw new Error(err);
			});
	});

});