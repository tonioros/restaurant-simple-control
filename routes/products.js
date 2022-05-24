const express = require("express");
const router = express.Router();
const db = require("../configuration/database/connection-database");

function whereBuilder(categoriaId = null, ID = null, pageNumber = 0) {
  let whereCategoryID = "";

  if (categoriaId && !isNaN(Number(categoriaId))) {
    whereCategoryID = `${whereCategoryID} WHERE categoriaid = ${Number(
      categoriaId
    )} `;
  }

  if (ID && !isNaN(Number(categoriaId))) {
    whereCategoryID = `${whereCategoryID} WHERE ID = ${Number(ID)} `;
  }

  return whereCategoryID;
}
router
  .route("/")
  .get((req, res) => {
    let selectColumns = "";
    let whereCategoryID = whereBuilder(req.query.category_id);

    if (req.query.simpleMode) {
      selectColumns = "ID, Nombre, categoriaid, precio_unit_con_iva";
    } else {
      selectColumns =
        "ID, Nombre, categoriaid, cant_disponible, precio_unit_sin_iva, precio_unit_con_iva, tipo_iva";
    }

    db.pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      connection.query(
        `SELECT ${selectColumns} FROM Productos ${whereCategoryID}`,
        (error, results) => {
          res.json(results);
        }
      );
    });
  })
  .post((req, res) => {
    const product = {
      Nombre: req.body.Nombre,
      categoriaid: req.body.categoriaid,
      cant_disponible: req.body.cant_disponible,
      precio_unit_sin_iva: req.body.precio_unit_sin_iva,
      precio_unit_con_iva: req.body.precio_unit_con_iva,
      tipo_iva: req.body.tipo_iva,
    };
    console.log("product", product);
    db.pool.getConnection((err, connection) => {
      if (err) throw err; // not connected!
      connection.query(
        `INSERT INTO Productos SET ?`,
        product,
        (error, results) => {
          if (error) throw error; // not connected!

          res.json({ insertId: results.insertId });
        }
      );
    });
  });

router.route("/:id").get((req, res) => {
  let whereCategoryID = whereBuilder(null, req.params.id);

  db.pool.getConnection((err, connection) => {
    if (err) throw err; // not connected!
    connection.query(
      `SELECT ID, Nombre, categoriaid, cant_disponible, precio_unit_sin_iva, precio_unit_con_iva, tipo_iva FROM Productos ${whereCategoryID}`,
      (error, results) => {
        connection.release();
          if (results.lenght > 0) res.json(results[0]);
          else res.json({}).status(404);
      }
    );
  });
});
module.exports = router;
