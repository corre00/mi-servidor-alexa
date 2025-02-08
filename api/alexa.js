const express = require('express');
const Alexa = require('ask-sdk-core');

const app = express();
app.use(express.json());

// Configuración de Alexa
const skill = Alexa.SkillBuilders.custom()
  .addRequestHandlers({
    canHandle(handlerInput) {
      return true; // Manejar todas las solicitudes
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak('¡Hola desde mi skill de Alexa!')
        .getResponse();
    }
  })
  .create();

// Ruta principal de Alexa
app.post('/api/alexa', (req, res) => {
  skill.invoke(req.body)
    .then(response => res.json(response))
    .catch(error => {
      console.error(error);
      res.status(500).send('Error');
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor listo en puerto ${PORT}`);
});