# mi-servidor-alexa
"Servidor para mi skill de Alexa"

Este repositorio contiene el código del servidor para una skill de Alexa.


## Código del servidor

```javascript
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/alexa', (req, res) => {
    const requestType = req.body.request.type;

    if (requestType === 'LaunchRequest') {
        res.json({
            response: {
                outputSpeech: {
                    type: 'PlainText',
                    text: 'Bienvenido a mi asistente. ¿En qué puedo ayudarte?'
                },
                shouldEndSession: false
            }
        });
    } else if (requestType === 'IntentRequest') {
        const intentName = req.body.request.intent.name;

        switch (intentName) {
            case 'AMAZON.CancelIntent':
            case 'AMAZON.StopIntent':
                res.json({
                    response: {
                        outputSpeech: {
                            type: 'PlainText',
                            text: 'Adiós'
                        },
                        shouldEndSession: true
                    }
                });
                break;
            case 'AMAZON.HelpIntent':
                res.json({
                    response: {
                        outputSpeech: {
                            type: 'PlainText',
                            text: 'Puedes decirme que haga algo'
                        },
                        shouldEndSession: false
                    }
                });
                break;
            case 'LaunchRequest':
                res.json({
                    response: {
                        outputSpeech: {
                            type: 'PlainText',
                            text: 'Bienvenido a mi asistente. ¿En qué puedo ayudarte?'
                        },
                        shouldEndSession: false
                    }
                });
                break;
            default:
                res.json({
                    response: {
                        outputSpeech: {
                            type: 'PlainText',
                            text: 'Lo siento, no entiendo esa solicitud'
                        },
                        shouldEndSession: false
                    }
                });
                break;
        }
    } else {
        res.status(400).send('Tipo de solicitud no soportado');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
