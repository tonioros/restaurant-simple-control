function connectDataBase() {
  const mysql = require("mysql");
  const environment = require("../environment");

  console.log('environment.database', environment);

  const connection = mysql.createConnection(environment.module.database);
  connection.connect();

  connection.query("SHOW DATABASES;", function (error, results) {
    if (error) throw error;
    console.log("The solution is: ", results[0]);
  });

  connection.end();
}

module.exports = connectDataBase;
