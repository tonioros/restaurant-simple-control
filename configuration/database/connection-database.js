const _connection = {
  connect:  () => {
    const mysql = require("mysql");
    const environment = require("../environment");
  
    const connectionPool = mysql.createPool(environment.module.database);
  
    connectionPool.query("SHOW DATABASES;", function (error) {
      if (error) throw error
       else console.log("Correct ConnectionPool to DB :)");
    });
    _connection.pool = connectionPool;
  },
  pool: null,
  close: () => {
    _connection.pool.end();
    _connection.pool.destroy();
  }
}



module.exports = _connection;
