const express = require("express");

var app = express();
const PORT = process.env.PORT || 3000;

app.get('/test', (req, res) => {
    res.send('Hello from App Engine!');
});

app.get('/test', (req, res) => {
    res.send('Hello from World!');
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});