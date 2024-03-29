const express = require("express");
const router = express.Router();
const db = require("../configuration/database/connection-database");

function whereBuilder(nombre = null, ID = null, pageNumber = 0) {
  let whereCategoryID = "";

  if (nombre) {
    whereCategoryID = `${whereCategoryID} WHERE nombre LIKE '%${nombre}%' `;
  }

  if (ID && !isNaN(Number(categoriaId))) {
    whereCategoryID = `${whereCategoryID} WHERE ID = ${Number(ID)} `;
  }

  return whereCategoryID;
}

/* GET All Resources. */
router
  .route("/")
  .get((req, res) => {
    const searchNombre = req.query.nombre;
    const whereStatement = whereBuilder(searchNombre);
    console.log(whereStatement)
    db.pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      connection.query(
        "SELECT ID, nombre, apellido, cedula, email, telefono, " +
          `creation_date FROM Clientes ${whereStatement} LIMIT 1000;`,
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
      telefono: req.body.telefono,
    };
    db.pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

      connection.query(
        "INSERT INTO Clientes SET ?",
        insertValues,
        (error, results) => {
          if (error) throw error;
          connection.release();
          res.json({ insertId: results.insertId });
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
        "SELECT ID, nombre, apellido, cedula, email, telefono, creation_date " +
          "FROM Clientes WHERE ID = " +
          ID +
          " LIMIT 1;",
        (error, results) => {
          if (error) throw error; // not connected!
          connection.release();
          if (results.lenght > 0) res.json(results[0]);
          else res.json({}).status(404);
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
          res.json({ affectedRows: results.affectedRows });
        }
      );
    });
  });

module.exports = router;
