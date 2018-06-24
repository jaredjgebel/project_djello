const app = require('../../server');
const userFactory = require('./factories/User');
const boardFactory = require('./factories/Board');
const listFactory = require('./factories/List');
const cardFactory = require('./factories/Card');
const historyFactory = require('./factories/History');
const clean = require('./truncate');
const {
   editBoard,
   editList,
   editCard,
} = require('../sequelize/data/put-methods');

describe('Entity update methods', () => {
   let board, list, card;

   beforeEach(async () => {
      await clean();

      newBoard = await boardFactory();
      newList = await listFactory();
      newCard = await cardFactory();

      board = newBoard.dataValues;
      list = newList.dataValues;
      card = newCard.dataValues;
   });

   it('edits a board', done => {
      editBoard(board.id, 'Edited title', 'Edited description')
         .then(resBoard => {
            expect(resBoard.title).toBe('Edited title');
            expect(resBoard.description).toBe('Edited description');
            done();
         })
         .catch(err => {
            throw new Error(err);
         });;
   });

   it('edits a list', done => {
      editList(list.id, title = 'Edited title', description = 'Edited description')
         .then(resList => {
            expect(resList.title).toBe('Edited title');
            expect(resList.description).toBe('Edited description');
            done();
         })
         .catch(err => {
            throw new Error(err);
         });;
   });

   it('edits a card', done => {
      editCard(card.id, 'Edited title', 'Edited description', true)
         .then(resCard => {
            expect(resCard.title).toBe('Edited title');
            expect(resCard.complete).toBe(true);
            done();
         });
   });
});