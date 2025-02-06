# mi-servidor-alexa
Servidor para mi skill de Alexa

Este repositorio contiene el código del servidor para una skill de Alexa.

## Características del servidor

El servidor incluye las siguientes características:
- Uso de middlewares `morgan` para el logging y `body-parser` para el manejo de cuerpos de solicitudes.
- Integración con Twilio para manejar webhooks de Twilio.

## Código del servidor

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { WebhookClient } = require('dialogflow-fulfillment');
const twilio = require('twilio');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Soportar cuerpos codificados
app.use(morgan('dev')); // Logging

app.get('/', (req, res) => {
    res.send('Hello World!');
});

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
            case 'HolaIntent':
                res.json({
                    response: {
                        outputSpeech: {
                            type: 'PlainText',
                            text: 'Hola'
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

app.post('/twiliowebhook', (req, res, next) => {
    let response = new twilio.twiml.MessagingResponse();

    console.log('twiliowebhook');
    console.log(req.body);

    // todo: call dialogflow

    response.message('response from custom tier');
    res.send(response.toString());
});

const port = 3000;
app.listen(port, () => {
    console.log('Servidor escuchando en el puerto 3000!');
});
