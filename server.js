// server.js
const express = require('express');
const crypto = require('crypto');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname))); // Sirve HTML, CSS, JS

// Hasheamos la clave real
const claveReal = "secreto123";
const claveHash = crypto.createHash('sha256').update(claveReal).digest('hex');

// Endpoint para verificar la clave
app.post('/verificar', (req, res) => {
    console.log("Petición recibida:", req.body);
    const { clave } = req.body;
    const hashInput = crypto.createHash('sha256').update(clave).digest('hex');

    if(hashInput === claveHash){
        res.json({ acceso: true });
    } else {
        res.json({ acceso: false });
    }
});


app.listen(3000, () => console.log("Servidor escuchando"));