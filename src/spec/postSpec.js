const app = require('../../server');
const userFactory = require('./factories/User');
const boardFactory = require('./factories/Board');
const listFactory = require('./factories/List');
const cardFactory = require('./factories/Card');
const clean = require('./truncate');
const {
   createBoard,
   createList,
   createCard,
   createHistory,
} = require('../sequelize/data/post-methods');

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

   xit('creates a board with the given attributes', done => {
      createBoard(user.id, 'Title', 'Description')
         .then(response => {
            const resBoard = response[0];
            const resUser = response[1];

            expect(resBoard.title).toBe('Title');
            // was board added to the user?
            expect(resUser.BoardIds[0]).toBe(resBoard.id);
            done();
         })
         .catch(err => {
            throw new Error(err);
         });
   });

   xit('creates a list with the given attributes', done => {
      createList(board.id, 'New List', 'Description')
         .then(response => {
            const resList = response[0];
            const resBoard = response[1];

            expect(resList.description).toBe('Description');
            expect(resBoard.ListIds[0]).toBe(resList.id);
            done();
         })
         .catch(err => {
            throw new Error(err);
         });
   });

   xit('creates a card with the given attributes', done => {
      createCard(list.id, 'New Card', 'Card Description')
         .then(response => {
            const resCard = response[0];
            const resList = response[1];

            expect(resCard.title).toBe('New Card');
            expect(resList.CardIds[0]).toBe(resCard.id);
            done();
         })
         .catch(err => {
            throw new Error(err);
         });
   });

   xit('creates a history with the given attributes', done => {
      // still need to figure out history options
      createHistory(card.id, 'History text')
         .then(response => {
            const resHistory = response[0];
            const resCard = response[1];

            expect(resHistory.text).toBe('History text');
            expect(resCard.HistoryIds[0]).toBe(resHistory.id);
            done();
         })
         .catch(err => {
            throw new Error(err);
         });
   });
});