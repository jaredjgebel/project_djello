const app = require('../../../server');
const request = require('request');
require('request-debug')(request);
const qs = require('qs');
const clean = require('../truncate');
const boardFactory = require('../factories/Board');
const listFactory = require('../factories/List');
const cardFactory = require('../factories/Card');
const {
   addListToBoard,
   addCardToList,
} = require('../../sequelize/data/utility-methods');

describe('List endpoint', () => {
   const baseUrl = 'http://localhost:8888';
   const apiUrl = baseUrl + '/api/v1';
   let server, board, list, card, newBoard, newList, newCard;

   beforeAll(done => {
      server = app.listen(8888, () => {
         done();
      });
   });

   beforeEach(async () => {
      await clean();

      newBoard = await boardFactory();
      newList = await listFactory();
      newCard = await cardFactory();

      board = newBoard.dataValues;
      list = newList.dataValues;
      card = newCard.dataValues;

      await addListToBoard(board.id, list.id);
      await addCardToList(list.id, card.id);
   });

   it('retrieves lists for a given board', done => {
      const options = {
         url: `${apiUrl}/boards/${board.id}/lists`,
      };

      request.get(options, (err, res) => {
         const body = JSON.parse(res.body);

         expect(res.statusCode).toBe(200);
         expect(body[0].CardIds[0]).toBe(card.id);
         done();
      });
   });

   it('retrieves a list for a given id', done => {
      const options = {
         url: `${apiUrl}/lists/${list.id}`,
      };

      request.get(options, (err, res) => {
         const body = JSON.parse(res.body);

         expect(res.statusCode).toBe(200);
         expect(body.CardIds[0]).toBe(card.id);
         done();
      });
   });

   it('creates a new list for a given board', done => {
      const dataValues = {
         title: 'New list',
         description: 'This is a new list.',
      };

      const options = {
         url: `${apiUrl}/boards/${board.id}/lists`,
         qs: dataValues,
      };

      request.post(options, (err, res) => {
         const body = JSON.parse(res.body);

         expect(res.statusCode).toBe(200);
         expect(body.list.title).toBe('New list');
         expect(body.board.ListIds).toContain(body.list.id);
         done();
      });
   });

   it('edits a list with a given id', done => {
      const listValues = {
         title: 'Same title',
         description: 'Edited description',
      };

      const options = {
         url: `${apiUrl}/lists/${list.id}`,
         qs: listValues,
      };

      request.put(options, (err, res) => {
         const body = JSON.parse(res.body);

         expect(res.statusCode).toBe(200);
         expect(body.description).toBe('Edited description');
         done();
      });
   });

   it('deletes a list with a given id', done => {
      const options = {
         url: `${apiUrl}/lists/${list.id}`,
      };

      request.delete(options, (err, res) => {
         expect(res.statusCode).toBe(200);
         done();
      });
   });

   afterAll(done => {
      server.close();
      server = null;
      done();
   });

});