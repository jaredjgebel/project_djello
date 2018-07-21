const app = require('../../../server/server');
const request = require('request');
require('request-debug')(request);
const clean = require('../truncate');
const userFactory = require('../factories/User');
const listFactory = require('../factories/List');
const cardFactory = require('../factories/Card');
const historyFactory = require('../factories/History');
const {
   addCardToList,
   addHistoryToCard,
   addAssigneeToCard,
} = require('../../sequelize/data/utility-methods');

describe('Card endpoint', () => {
   const baseUrl = 'http://localhost:8888';
   const apiUrl = baseUrl + '/api/v1';
   let server, user, list, card, history, newUser, newList, newCard, newHistory;

   beforeAll(done => {
      server = app.listen(8888, () => {
         done();
      });
   });

   beforeEach(async () => {
      await clean();

      newUser = await userFactory();
      newList = await listFactory();
      newCard = await cardFactory();
      newHistory = await historyFactory();

      user = newUser.dataValues;
      list = newList.dataValues;
      card = newCard.dataValues;
      history = newHistory.dataValues;

      await addCardToList(list.id, card.id);
      await addHistoryToCard(card.id, history.id);
      await addAssigneeToCard(card.id, user.id);
   });

   it('retrieves cards for a given list', done => {
      const options = {
         url: `${apiUrl}/lists/${list.id}/cards`,
      };

      request.get(options, (err, res) => {
         const body = JSON.parse(res.body);

         expect(res.statusCode).toBe(200);
         expect(body[0].card.id).toBe(card.id);
         expect(body[0].assignees[0].id).toBe(user.id);
         done();
      });
   });

   it('retrieves a single card', done => {
      const options = {
         url: `${apiUrl}/cards/${card.id}`,
      };

      request.get(options, (err, res) => {
         const body = JSON.parse(res.body);

         expect(res.statusCode).toBe(200);
         expect(body.HistoryIds).toContain(history.id);
         expect(body.AssigneeIds).toContain(user.id);
         done();
      });
   });

   it('creates a new card', done => {
      const cardValues = {
         title: 'New title',
         description: 'New description',
      };

      const options = {
         url: `${apiUrl}/lists/${list.id}/cards`,
         qs: cardValues,
      };

      request.post(options, (err, res) => {
         const body = JSON.parse(res.body);

         expect(res.statusCode).toBe(200);
         expect(body.card.title).toBe('New title');
         expect(body.list.CardIds).toContain(body.card.id);
         done();
      });
   });

   it('edits a card with a given id', done => {
      const cardValues = {
         description: 'Edited description',
      };

      const options = {
         url: `${apiUrl}/cards/${card.id}`,
         qs: cardValues,
      };

      request.put(options, (err, res) => {
         const body = JSON.parse(res.body);

         expect(res.statusCode).toBe(200);
         expect(body.description).toBe('Edited description');
         done();
      });
   });

   it('deletes a card with a given id', done => {
      const options = {
         url: `${apiUrl}/cards/${card.id}`
      };

      request.delete(options, (err, res) => {
         expect(res.statusCode).toBe(200);
         expect(res.body).toContain('Card and associated histories successfully deleted.');
         done();
      });
   });

   afterAll(done => {
      server.close();
      server = null;
      done();
   });

});