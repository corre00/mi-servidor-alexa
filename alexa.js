const express = require('express');
const app = express();
app.use(express.json());

app.post('/alexa', (req, res) => {
    // Tu código aquí (igual que en index.js)
});

module.exports = app;  // Exporta la aplicación para Vercel
