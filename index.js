const express = require('express');
const app = express();
app.use(express.json());

// Ruta POST para /alexa
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

// Puerto configurado para Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});
