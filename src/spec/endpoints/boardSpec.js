const app = require('../../../server/server');
const request = require('request');
require('request-debug')(request);
const clean = require('../truncate');
const boardFactory = require('../factories/Board');
const userFactory = require('../factories/User');
const { addBoardToUser } = require('../../sequelize/data/utility-methods');

describe('Board endpoint', () => {
   const baseUrl = 'http://localhost:8888';
   const apiUrl = baseUrl + '/api/v1';
   let server, board, user;

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

   it('retrieves the information for a single board', done => {
      const options = {
         url: `${apiUrl}/boards/${board.dataValues.id}`,
      };

      request.get(options, (err, res) => {
         expect(res.statusCode).toBe(200);
         expect(res.body).toContain('title');
         done();
      });
   })

   it('retrieves all boards for a given user', done => {
      const options = {
         url: `${apiUrl}/users/${user.dataValues.id}/boards`,
      };

      request.get(options, (err, res) => {
         expect(res.statusCode).toBe(200);
         expect(res.body).toContain('title');
         done();
      });
   });

   it('creates a new board when a post request is submitted', done => {
      const boardValues = {
         title: 'Board title',
         description: 'Board description'
      };

      const options = {
         url: `${apiUrl}/boards/${user.dataValues.id}`,
         qs: boardValues,
      };

      request.post(options, (err, res) => {
         const body = JSON.parse(res.body);

         expect(res.statusCode).toBe(200);
         expect(body.board.title).toBe('Board title');
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
         expect(res.statusCode).toBe(200);
         expect(res.body).toContain('Edited board');
         done();
      });
   });

   it('deletes a board on request', done => {
      request.delete(`${apiUrl}/boards/${board.dataValues.id}`, (err, res) => {
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