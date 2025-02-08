const { createServer } = require('http');
const Alexa = require('ask-sdk-core');

const skill = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    {
      canHandle(handlerInput) {
        return true;
      },
      handle(handlerInput) {
        return handlerInput.responseBuilder
          .speak('Hola desde mi skill de Alexa!')
          .getResponse();
      }
    }
  )
  .create();

const server = createServer(async (req, res) => {
  if (req.url === '/api/alexa' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      skill.invoke(JSON.parse(body))
        .then(response => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(response));
        })
        .catch(error => {
          console.error(error);
          res.writeHead(500);
          res.end();
        });
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor ejecutándose en puerto ${port}`);
});