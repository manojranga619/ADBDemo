const express = require("express");
const cors = require('cors');
const bodyparser = require("body-parser");
const connection = require("./connection");
const { Request } = require("tedious");
var employees = [
    { Name: 'Dhruvi', Salary: 100000, Room: '999', Telnum: '911', Picture: 'dhruvi.jpeg', Keywords: 'Dhruviis verysmart' },
    { Name: 'SaiTheja', Salary: 99999, Room: '420', Telnum: '000', Picture: 'saitheja.jpeg', Keywords: 'SaiThejais evensmarter' },
    { Name: 'Dave', Salary: 1, Room: '525', Telnum: '-0', Picture: '', Keywords: 'Doesn’tseem too nice' }
];
var app = express();
app.use(bodyparser.json());
app.use(cors({
    origin: '*'
}));
// Default Route
app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

// Test Route
app.get('/test', (req, res) => {
    res.send(`Hello from App Engine! ${++count}`);
});

// Search By Name
app.get('/searchByName', (req, res) => {
    var name = req.query.name;
    var employee = employees.find(_ => _.Name === name);
    res.send(employee);
});

// Search By Salary
app.get('/searchBySalary', (req, res) => {
    var salary = req.query.salary ? Number(req.query.salary) : 0;
    var filteredEmployees = employees.filter(_ => _.Salary < salary);
    res.send(filteredEmployees);
});

// Update Picture.
app.post('/updatePicture', (req, res) => {
    var name = req.body.name;
    var picture = req.body.picture;
    var employee = employees.find(_ => _.Name === name);
    employee.Picture = picture;
    res.send(employee);
});

// Remove Employee
app.get('/removeEmployee', (req, res) => {
    var name = req.query.name;
    employees = employees.filter(_ => _.Name !== name);
    res.send(employees);
});

// Update Keyword
app.post('/updateKeyWord', (req, res) => {
    var name = req.body.name;
    var keyWord = req.body.keyWord;
    var name = req.body.name;
    if (name && keyWord && employees.some(_ => _.Name === name)) {
        employees.forEach(_ => {
            if (_.Name === name) {
                _.KeyWord = keyWord;
            }
        });
        res.send(employees); 
    }
    else {
        res.send("Invalid keyword or name or employee doesn't exist.")
    }
});

// Update Salary
app.post('/updateSalary', (req, res) => {
    var salary = req.body.salary;
    if (salary && name && employees.some(_ => _.Name === name)) {
        employees.forEach(_ => {
            if (_.Name === name) {
                _.Salary = salary;
            }
        });
        res.send(employees);    
    }
    else {
        res.send("Invalid salary or name or employee doesn't exist.")
    }
});

// app.post('/searchnamekeydb', (req, res) => {
//     var name = req.body.Name;
//     var value = req.body.Value;
//     var sql = `SELECT TOP 20 * FROM [details]`;
//     // Read all rows from table
//     const request = new Request(sql,
//         (err, rowCount) => {
//         if (err) {
//             console.error(err.message);
//         } else {
//             console.log(`${rowCount} row(s) returned`);
//             }
//         }
//     );
//     const rows = [];
//     request.on("row", columns => {
//         let row = {};
//         columns.forEach((column) => {
//             row[column.metadata.colName] = column.value;
//         });
//         rows.push(row);
//     });

//     request.on('done', (rowCount) => {
//         console.log('Done is called!');
//         res.send(rows);
//       });
    
//     request.on('doneInProc', (rowCount, more) => {
//         console.log(rowCount + ' rows returned');
//         res.send(rows);
//     });
//    connection.execSql(request);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});