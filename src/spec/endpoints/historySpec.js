const app = require('../../../server');
const request = require('request');
require('request-debug')(request);
const clean = require('../truncate');
const cardFactory = require('../factories/Card');
const historyFactory = require('../factories/History');
const {
   addHistoryToCard,
} = require('../../sequelize/data/utility-methods');

describe('History endpoint', () => {
   const baseUrl = 'http://localhost:8888';
   const apiUrl = baseUrl + '/api/v1';
   let server, card, history, newCard, newHistory;

   beforeAll(done => {
      server = app.listen(8888, () => {
         done();
      });
   });

   beforeEach(async () => {
      await clean();

      newCard = await cardFactory();
      newHistory = await historyFactory();

      card = newCard.dataValues;
      history = newHistory.dataValues;

      await addHistoryToCard(card.id, history.id);
   });

   it('serves a single history by id', done => {
      const options = {
         url: `${apiUrl}/histories/${history.id}`,
      };

      request.get(options, (err, res) => {
         const body = JSON.parse(res.body);

         expect(res.statusCode).toBe(200);
         expect(body.id).toBe(history.id);
         done();
      });
   });

   it('creates a history for a given card id', done => {
      const dataValues = {
         text: 'History text.',
      };

      const options = {
         url: `${apiUrl}/cards/${card.id}/histories`,
         qs: dataValues,
      };

      request.post(options, (err, res) => {
         const body = JSON.parse(res.body);

         expect(res.statusCode).toBe(200);
         expect(body.card.HistoryIds).toContain(body.history.id);
         expect(body.history.text).toBe('History text.');
         done();
      });
   })

   afterAll(done => {
      server.close();
      server = null;
      done();
   });
})