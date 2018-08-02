require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000;
const host = 'localhost';
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use(express.static('dist'));

app.use(cors({
   origin: `http://${host}:9000`,
   credentials: true,
}));

if (process.env.NODE_ENV !== 'test' || 'production') {
   app.use(morgan('tiny'));
}

// ROUTES
// First route does not use JWT auth
// It gets the API access token
const getToken = require('./routes/api-token');
app.use('/api/v1', getToken);

const apiGetRoutes = require('./routes/api-get');
app.use('/api/v1', apiGetRoutes);

const apiPostRoutes = require('./routes/api-post');
app.use('/api/v1', apiPostRoutes);

const apiPutRoutes = require('./routes/api-put');
app.use('/api/v1', apiPutRoutes);

const apiDeleteRoutes = require('./routes/api-delete');
app.use('/api/v1', apiDeleteRoutes);

let args;
process.env.NODE_ENV === 'production' ?
   args = [port] :
   args = [port, host];


args.push(() => {
   console.log(`Listening: http://${host}:${port}\n`);
});

// If file is being run directly, start the server
if (require.main === module) {
   app.listen.apply(app, args);
}

module.exports = app;