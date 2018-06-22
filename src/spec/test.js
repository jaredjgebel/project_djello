const request = require('request');
const qs = require('qs');

const baseUrl = 'http://localhost:5000';
const apiUrl = baseUrl + '/api/v1';

const boardValues = {
   id: 59,
   title: 'Edited board',
   description: 'This board has been edited',
};

const qstring = qs.stringify(boardValues);

const options = {
   url: `${apiUrl}/boards/59`,
};


request.get(options, (err, res) => {
   console.log(res);
});