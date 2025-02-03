const express = require('express');
const app = express();
app.use(express.json());

app.post('/alexa', (req, res) => {
    try {
        const requestType = req.body.request?.type;

        if (requestType === 'LaunchRequest') {
            return res.json({
                version: "1.0",
                response: {
                    outputSpeech: {
                        type: "PlainText",
                        text: "¡Hola! Soy tu asistente. ¿En qué puedo ayudarte?"
                    },
                    shouldEndSession: false
                }
            });
        }

        res.status(400).json({ error: "Tipo de solicitud no soportado" });
    } catch (error) {
        console.error("Error interno:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

module.exports = app;  // ¡Importante para Vercel!
