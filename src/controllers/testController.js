const fetch = require('node-fetch');

const test = async (req, res, next) => {
  const response = await fetch('http://localhost:3001/test/1');

  const body = await response.json();
  res.render('test', { title: 'Test', message: JSON.stringify(body)});
}

const test2 = async (req, res, next) => {
  const response = await fetch('http://localhost:3001/test/2');

  const body = await response.json();
  res.render('test', { title: 'Test', message: JSON.stringify(body)});
}

module.exports = {
  test,
  test2
}
