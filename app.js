//const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
const connection = require("./connection");
const { Request } = require("tedious");


var app = express();
app.use(bodyparser.json());
app.use(express.static('./routes'));

app.get('/test', (req, res) => {
    res.send('Hello from App Engine!');
});

app.post('/searchnamekey', (req, res) => {
    var name = req.body.Name;
    var value = req.body.Value;
    var sql = `SELECT TOP 20 Name FROM [details] d where ${name} = '${value}'`;
    // Read all rows from table
    const request = new Request(sql,
        (err, rowCount) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(`${rowCount} row(s) returned`);
        }
        }
    );

    request.on("row", columns => {
        res.send(columns);
    });

   connection.execSql(request);
});

const PORT = process.env.PORT || 4243;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});