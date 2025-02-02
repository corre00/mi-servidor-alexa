const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Ruta para manejar las solicitudes de Alexa
app.post('/alexa', (req, res) => {
    const requestType = req.body.request.type;

    if (requestType === 'LaunchRequest') {
        return res.json({
            version: '1.0',
            response: {
                outputSpeech: {
                    type: 'PlainText',
                    text: '¡Hola! Soy tu asistente. ¿En qué puedo ayudarte?'
                },
                shouldEndSession: false
            }
        });
    }

    res.json({ error: 'Intención no reconocida' });
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
