const express = require('express');
const router = express.Router();
const connection = require('../db');
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
    try {
        const { productoNombre, productoDescripcion, numeroTel } = req.body;

        if (!productoNombre || !productoDescripcion || !numeroTel) {
            return res.status(400).json({ error: 'Faltan datos en la solicitud' });
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'emanuel.j.figueredo@gmail.com',
                pass: 'opbz yufo uuvt nmdd'
            }
        });

        let mailOptions = {
            from: '"Mendez Mueblería" <mendez.muebleria10@gmail.com>',
            to: 'mendez.muebleria10@gmail.com',
            subject: 'Nuevo Pedido de Producto',
            text: `Nuevo pedido recibido:\n\nProducto: ${productoNombre}\nTeléfono del cliente: ${numeroTel}`,
            html: `<h2>Nuevo Pedido Recibido</h2>
                   <p><strong>Producto:</strong> ${productoNombre}, ${productoDescripcion}</p>
                   <p><strong>Teléfono del Cliente:</strong> ${numeroTel}</p>`
        };

        let info = await transporter.sendMail(mailOptions);

        console.log('Correo enviado: ', info.messageId);
        res.status(200).json({ message: 'Pedido enviado correctamente', messageId: info.messageId });

    } catch (error) {
        console.error('Error al enviar correo:', error);
        res.status(500).json({ error: 'Error al enviar el pedido' });
    }
});

module.exports = router;