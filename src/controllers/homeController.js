const fetch = require('node-fetch');

const renderHome = async (req, res, next) => {
  const response = await fetch('http://localhost:3001/test/1');

  const body = await response.json();
  res.render('index2', { title: 'Jopiter Classificador Web', message: JSON.stringify(body), algumaVariavel: 'lalalala'});
  //res.render('index', { title: 'Jopiter Classificador Web', message: JSON.stringify(body), algumaVariavel: 'lalalala'});
}

module.exports = {
  renderHome,
}
