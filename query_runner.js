var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var ConnectionPool = require('tedious-connection-pool');

var poolConfig = {
    min: 10,
    max: 20,
    log: true
};


function QueryRunner() {
    // Create connection to database
    this.config = 
    {
        userName: 'athlete',
        password: 'calvinscoutingreport123!',
        server: 'calvinscoutingreport.database.windows.net',
        options: 
        {
            database: 'ScoutingReport',
            encrypt: true
        }
    };

    //create the pool
    this.pool = new ConnectionPool(poolConfig, this.config);

    this.pool.on('error', function (err) {
        console.error(err);
    });
   
}

//run a query
QueryRunner.prototype.runQuery = function(query_text, callback_fn, res)
{ 
    this.pool.acquire(function(err, connection) {

        if (err) {
            console.log(err);
            res.json([]);
            return;
        }

        console.log('Reading rows from the Table...');
        var response = [];

        // Read all rows from table
        request = new Request(
            query_text,
            function (err, rowCount, rows) {
                console.log("error: " + err);
                console.log("For query: " + query_text);
                console.log(rowCount + ' row(s) returned');
                console.log("\n\n\n");
                callback_fn(res, response);
                connection.release();
            }
        );

        request.on('row', function (columns) {
            var additionalRow = {};
            columns.forEach(function (column) {
                //console.log("%s\t%s", column.metadata.colName, column.value);
                additionalRow[column.metadata.colName] = column.value;
            });
            response.push(additionalRow);
        });

        connection.execSql(request);

    });
}

exports.buildQueryRunner = function () {
    return new QueryRunner();
}