const express = require("express");
const router = express.Router();
const db = require("../configuration/database/connection-database");

/* GET All Resources. */
router
  .route("/")
  .get((req, res) => {
    db.pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      connection.query(
        "SELECT ID, nombre_categoria FROM CategoriaProductos",
        (error, results) => {
          if (error) throw error; // not connected!
          connection.release();
          res.json(results);
        }
      );
    });
  })
/* Insert new Tables. */
  .post((req, res) => {
    const insertValues = {
      nombre_categoria: req.body.nombre_categoria,
    };
    db.pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

      connection.query(
        "INSERT INTO CategoriaProductos SET ?",
        insertValues,
        (error, results) => {
          if (error) throw error;
          connection.release();
          res.json({insertId: results.insertId});
        }
      );
    });
  });
module.exports = router;