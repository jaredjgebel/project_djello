const express = require('express');
const path = require('path');
const compression = require('compression');

const port = process.env.PORT || 5000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

const apiRoutes = require('./routes/api');
app.use('/api/v1', apiRoutes);

app.get('/api', (req, res) => {
   res.json({ "hi": "there" });
});

app.get('*', (req, res) =>
   res.sendFile(path.join(__dirname, '/dist/index.html'))
);

app.listen(port);