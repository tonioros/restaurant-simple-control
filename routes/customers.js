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
        "SELECT ID, nombre, apellido, cedula, email, telefono, "+
        "creation_date FROM Clientes LIMIT 1000;",
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
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
        email: req.body.email,
        telefono: req.body.telefono
    };
    db.pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

      connection.query(
        "INSERT INTO Clientes SET ?",
        insertValues,
        (error, results) => {
          if (error) throw error;
          connection.release();
          res.json({insertId: results.insertId});
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
          "SELECT ID, nombre, apellido, cedula, email, telefono, creation_date "+
          "FROM Clientes WHERE ID = " + ID + " LIMIT 1;",
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
        "DELETE FROM Clientes WHERE ID = " + ID,
        (error, results) => {
          if (error) throw error;
          connection.release();
          res.json({affectedRows: results.affectedRows});
        }
      );
    });
  });

module.exports = router;