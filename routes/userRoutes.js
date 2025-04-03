const express = require('express');
const router = express.Router();
const connection = require('../db');

// Ruta para obtener los productos
router.get('/', (req, res) => {
    const query = 'SELECT * FROM productos';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err.message);
        return res.status(500).send('Error al obtener productos.');
      }
      res.json(results);
    });
});

// Ruta para obtener los productos por tipo
router.get('/:tipo', (req, res) => {
  const { tipo } = req.params;
  const query = 'SELECT * FROM productos WHERE tipo = ? ';
  connection.query(query,  [tipo], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err.message);
      return res.status(500).send('Error al obtener productos.');
    }
    res.json(results);
  });
});

module.exports = router;
