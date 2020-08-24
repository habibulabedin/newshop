var express = require('express');
const path =require('path');
var app = express();
//app.use('/',express.static(path.join(__dirname,"public")));
app.get('/', (req, res) => {
    res.sendFile('./public/home.html', { root: __dirname });
});

const bodyparser = require('body-parser');
app.use(bodyparser.json());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
var sql = require("mssql");

    // config for your database
    var config = {
        user: 'admin_main',
        password: 'student1234##',
        server: 'personalwork.database.windows.net', 
        database: 'final_assignment ' 
    };

app.get('/api/:table', function (req, res) {
   
    
     
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(`select * from `+req.params.table, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
