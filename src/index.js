const express = require('express')
const bodyParser = require('body-parser')

const app = express()

require('./config/routes')(app);

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err, 'Erro inesperado');
  next();
});

app.listen(3000, () => {
  console.log('Servidor configurado no localhost');
});
