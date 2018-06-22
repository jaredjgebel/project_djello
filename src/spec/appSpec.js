const app = require('../../server');
const request = require('request');
const clean = require('./truncate');

describe('App', () => {
   const baseUrl = 'http://localhost:8888';
   const apiUrl = baseUrl + '/api/v1/';
   let server;

   beforeAll(async done => {
      await clean();

      server = app.listen(8888, () => {
         done();
      });
   });

   it('renders the home page', done => {
      request.get(baseUrl, (err, res, body) => {
         expect(res.statusCode).toBe(200);
         expect(body).toMatch(/body/i);
         done();
      });
   });

   afterAll(done => {
      server.close();
      server = null;
      done();
   });
});