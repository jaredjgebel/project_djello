const app = require('../../server');
const request = require('request');
require('request-debug')(request);
const qs = require('qs');
const clean = require('./truncate');
const boardFactory = require('./factories/Board');
const userFactory = require('./factories/User');
const { addBoardToUser } = require('../sequelize/data/utility-methods');

describe('Board endpoint', () => {
   const baseUrl = 'http://localhost:8888';
   const apiUrl = baseUrl + '/api/v1';
   let server, board, user;

   // clean each time or before all? seems to be a point of contention
   beforeAll(done => {
      server = app.listen(8888, () => {
         done();
      });
   });

   beforeEach(async () => {

      await clean();

      board = await boardFactory();
      user = await userFactory();
      await addBoardToUser(user.dataValues.id, board.dataValues.id);
   });

   it('retrieves board information for a given id', done => {
      const options = {
         url: `${apiUrl}/boards/${user.dataValues.id}`,
      };

      request.get(options, (err, res) => {
         expect(res.statusCode).toEqual(200);
         expect(res.body).toContain('title');
         done();
      });
   });

   it('creates a new board when a post request is submitted', done => {
      request.post(`${apiUrl}/boards/${user.dataValues.id}`, (err, res) => {
         expect(res.statusCode).toEqual(200);
         expect(res.body).toContain('ListIds');
         done();
      });
   });

   it('updates a board when a put request is submitted', done => {
      const boardValues = {
         id: `${board.dataValues.id}`,
         title: 'Edited board',
         description: 'This board has been edited',
      };


      const options = {
         url: `${apiUrl}/boards`,
         // qs value here is object 
         // NOT actual query string
         qs: boardValues,
      };

      request.put(options, (err, res) => {
         expect(res.statusCode).toEqual(200);
         expect(res.body).toContain('Edited board');
         done();
      });
   });

   it('deletes a board on request', done => {
      request.delete(`${apiUrl}/boards/${board.dataValues.id}`, (err, res) => {
         expect(res.statusCode).toEqual(200);
         expect(res.body).toContain('OK');
         done();
      });
   });

   afterAll(done => {
      server.close();
      server = null;
      done();
   });

});