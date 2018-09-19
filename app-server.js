const path = require('path');
const express = require('express');

const DIST_DIR = path.join(__dirname, "dist");

const PORT = 9000;
const app = express();

app.use(express.static(DIST_DIR));

app.get("*", (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => {
    console.log("Listening on port 9000");
});