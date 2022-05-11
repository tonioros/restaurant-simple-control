const express = require("express");
const router = express.Router();
const db = require("../configuration/database/connection-database");

/* GET All Resources. */
router
  .route("/")
  .get((req, res) => {
    db.pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      connection.query(
        "SELECT ID, tipo_orden, mesa_id, cliente_id, creation_date, estado FROM PreOrden",
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
      tipo_orden: req.body.tipo_orden,
      mesa_id: req.body.mesa_id,
      cliente_id: req.body.cliente_id,
      estado: req.body.estado,
    };
    db.pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!

      connection.query(
        "INSERT INTO PreOrden SET ?",
        insertValues,
        (error, results) => {
          if (error) throw error;
          connection.release();
          res.json({ insertId: results.insertId });
        }
      );
    });
  });

router.route("/:id").get((req, res) => {
  const ID = req.params.id;

  db.pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!

    connection.query(
      "SELECT ID, tipo_orden, mesa_id, cliente_id, creation_date, estado FROM PreOrden WHERE ID = " +
        ID,
      (error, results) => {
        if (error) throw error; // not connected!
        connection.release();
        res.json(results[0]);
      }
    );
  });
});
module.exports = router;
