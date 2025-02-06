const express = require('express');
const app = express();
app.use(express.json());
app.post('/api/alexa', (req, res) =
    res.send('Hello, Alexa!');
});
app.listen(port, () =
    console.log(`Servidor escuchando en el puerto ${port}`);
});
