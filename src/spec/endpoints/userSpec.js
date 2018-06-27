const app = require('../../../server');
const request = require('request');
const clean = require('../truncate');
const userFactory = require('../factories/User');

describe('User endpoint', () => {
   const baseUrl = 'http://localhost:8888';
   const apiUrl = baseUrl + '/api/v1';
   let server;
   let user;

   beforeAll(done => {
      server = app.listen(8888, () => {
         done();
      });
   });


   beforeEach(async () => {
      await clean();

      user = await userFactory();
   });

   it('retrieves user information from a given id', done => {
      request.get(`${apiUrl}/users/${user.dataValues.id}`, (err, res) => {
         expect(res.statusCode).toEqual(200);
         expect(res.body).toContain('first');
         done();
      });
   });

   afterAll(done => {
      server.close();
      server = null;
      done();
   });

});