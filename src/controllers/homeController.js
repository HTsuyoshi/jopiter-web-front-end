const config = require('config');
const fetch = require('node-fetch');

//const BACKEND_URL = config.get('jopiter-backend.url');
//const BACKEND_URL = config.get('localhost:3000');

const renderHome = async (req, res, next) => {
  const response = await fetch('http://localhost:3001/test/1');

  const body = await response.json();
  res.render('index', { title: 'Jopiter Classificador Web', message: JSON.stringify(body), algumaVariavel: 'lalalala'});
}

module.exports = {
  renderHome,
}
