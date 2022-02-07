const express = require("express");

var app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello from App Engine!');
});

app.get('/test', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
