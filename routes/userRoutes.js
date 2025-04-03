const express = require('express');
const router = express.Router();
const pool = require('../db'); // Ahora usamos un pool de conexiones

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const [results] = await pool.promise().query('SELECT * FROM productos');
        res.json(results);
    } catch (err) {
        console.error('Error en la consulta:', err.message);
        res.status(500).send('Error al obtener productos.');
    }
});

// Ruta para obtener productos por tipo
router.get('/:tipo', async (req, res) => {
    try {
        const { tipo } = req.params;
        const [results] = await pool.promise().query('SELECT * FROM productos WHERE tipo = ?', [tipo]);
        res.json(results);
    } catch (err) {
        console.error('Error en la consulta:', err.message);
        res.status(500).send('Error al obtener productos.');
    }
});

module.exports = router;
