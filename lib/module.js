const { Module, Responder } = require('adapt-authoring-core');
const path = require('path');

/**
* TODO
*/
class MissingRoute extends Module {
  /**
  * TODO
  */
  boot(app, resolve, reject) {
    const server = app.getModule('server');
    server.on('boot', () => {
      this.log('debug', 'No routes will be processed beyond this point');
      server.use(this.routeHandler);
      server.use('/api/*', this.apiHandler);
    });
    resolve();
  }

  routeHandler(req, res, next) {
    res.status(404).render(path.join(__dirname, '../views/index'), { route: req.url, method: req.method });
  }

  apiHandler(req, res, next) {
    new Responder(res).error(`Invalid API route ${req.originalUrl}`, 404);
  }
}

module.exports = MissingRoute;
