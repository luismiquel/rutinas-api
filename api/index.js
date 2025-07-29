const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  const { nivel, objetivo } = req.query;

  if (!nivel || !objetivo) {
    return res.status(400).json({ error: 'Parámetros "nivel" y "objetivo" son requeridos.' });
  }

  const filePath = path.join(__dirname, '..', 'data', 'rutinas.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al leer las rutinas.' });

    const rutinas = JSON.parse(data);
    const rutina = rutinas[nivel]?.[objetivo];

    if (!rutina) {
      return res.status(400).json({ error: 'Combinación de nivel y objetivo no válida.' });
    }

    res.json({ rutina });
  });
});

module.exports = app;
