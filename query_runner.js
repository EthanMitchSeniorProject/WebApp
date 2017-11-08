var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

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

    this.connection = new Connection(this.config);
    // Attempt to connect
    this.connection.on('connect', function(err) 
    {
        if (err) 
        { 
            console.log(err); 
        }
        else 
        {
            console.log("Successfully connected to DB on Azure");
        }
    });
}

//run a query
QueryRunner.prototype.runQuery = function(query_text, callback_fn)
{ 
    console.log('Reading rows from the Table...');
    var response = [];

    // Read all rows from table
    request = new Request(
        query_text,
        function(err, rowCount, rows) 
        {
            console.log(rowCount + ' row(s) returned');
            callback_fn(response);
        }
    );

    //TODO: This needs to be changed from print statements to be a return json object


    request.on('row', function(columns) {
        var additionalRow = {};
        columns.forEach(function(column) {
            //console.log("%s\t%s", column.metadata.colName, column.value);
            additionalRow[column.metadata.colName] = column.value;
        });
        response.push(additionalRow);
    });

    this.connection.execSql(request);
}

exports.buildQueryRunner = function() {
    return new QueryRunner();
}