const express = require("express");
const router = express.Router();
const db = require("../configuration/database/connection-database");

/* GET All Resources. */
router
  .route("/")
  .get((req, res, next) => {
    db.pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      connection.query(
        "SELECT ID, nombre_mesa, habilitada FROM Mesas",
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
      nombre_mesa: req.body.nombre_mesa,
      habilitada: (req.body.habilitada ? 1 : 0)
    };
    db.pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

      connection.query(
        "INSERT INTO Mesas SET ?",
        insertValues,
        (error, results) => {
          if (error) throw error;
          connection.release();
          res.json(results.insertId);
        }
      );
    });
  });

/* GET One Table. */
router
  .route("/:id")
  .get((req, res) => {
    const ID = req.params.id;

    db.pool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!

        connection.query(
          "SELECT ID, nombre_mesa, habilitada FROM Mesas WHERE ID = " + ID,
          (error, results) => {
            if (error) throw error; // not connected!
            connection.release();
            res.json(results[0]);
          }
        );
      });
  })
/* Delete One Table. */
  .delete((req, res) => {
    const ID = req.params.id;
    db.pool.getConnection(function (err, connection) {
      connection.query(
        "DELETE FROM Mesas WHERE ID = " + ID,
        (error, results) => {
          if (error) throw error;
          connection.release();
          res.json({affectedRows: results.affectedRows});
        }
      );
    });
  });

module.exports = router;
