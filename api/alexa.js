const express = require('express');
const Alexa = require('ask-sdk-core');

const app = express();
app.use(express.json());

// Configuración completa de Alexa
const skill = Alexa.SkillBuilders.custom()
  .addRequestHandlers({
    canHandle: () => true,
    handle: (handlerInput) => {
      return handlerInput.responseBuilder
        .speak('¡Hola desde Vercel!')
        .getResponse();
    }
  })
  .withApiClient(new Alexa.DefaultApiClient())
  .create();

// Ruta adaptada para Vercel
app.post('/api/alexa', async (req, res) => { // <-- Ahora con /api/
  try {
    const response = await skill.invoke(req.body);
    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: 'Solicitud inválida de Alexa' });
  }
});

// Exportación especial para Vercel
module.exports = app;

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor listo en puerto ${PORT}`);
});
