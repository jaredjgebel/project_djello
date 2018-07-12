const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const rp = require('request-promise-native')
require('dotenv').config();

const checkJwt = jwt({
   secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://djellodata.auth0.com/.well-known/jwks.json`
   }),
   audience: 'http://djello-database',
   issuer: `https://djellodata.auth0.com/`,
   algorithms: ['RS256']
});

const getDatabaseToken = () => {
   return new Promise((resolve, reject) => {
      const options = {
         method: 'POST',
         url: 'https://djellodata.auth0.com/oauth/token',
         headers: { 'content-type': 'application/json' },
         body: `{"client_id":"${process.env.API_CLIENT_ID}","client_secret":"${process.env.API_CLIENT_SECRET}","audience":"http://djello-database","grant_type":"client_credentials"}`,
      };

      rp(options)
         .then(response => {
            resolve(response);
         })
         .catch(err => {
            reject(err);
         });
   })

};

module.exports = {
   checkJwt,
   getDatabaseToken
};