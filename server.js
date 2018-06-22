const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');

const port = process.env.PORT || 5000;
const host = 'localhost';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use(express.static('dist'));

if (process.env.NODE_ENV !== 'test') {
   app.use(morgan('tiny'));
}

const apiGetRoutes = require('./src/routes/api-get');
app.use('/api/v1', apiGetRoutes);

const apiPostRoutes = require('./src/routes/api-post');
app.use('/api/v1', apiPostRoutes);

const apiPutRoutes = require('./src/routes/api-put');
app.use('/api/v1', apiPutRoutes);

const apiDeleteRoutes = require('./src/routes/api-delete');
app.use('/api/v1', apiDeleteRoutes);

app.get('/api', (req, res) => {
   res.json({ "hi": "there" });
});

app.get('*', (req, res) =>
   res.sendFile(path.join(__dirname, '/dist/index.html'))
);

let args;
process.env.NODE_ENV === 'production' ?
   args = [port] :
   args = [port, host];


args.push(() => {
   console.log(`Listening: http://${host}:${port}\n`);
});

// If file is being run directly start the server
if (require.main === module) {
   app.listen.apply(app, args);
}

module.exports = app;