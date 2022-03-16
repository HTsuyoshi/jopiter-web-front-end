const { urlencoded } = require('express');
const homeController = require('../controllers/homeController');
const testController = require('../controllers/testController');

module.exports = function (app) {
  app.use(urlencoded({ extended: true }));

  app.get('/', homeController.renderHome);

  app.get('/test', testController.test);

  app.get('/test2', testController.test2);
}
