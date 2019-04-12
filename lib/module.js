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
      server.addMiddleware(this.pageHandler);
      server.addApiMiddleware(this.apiHandler);
      this.log('warn', 'No routes will be processed beyond this point');
    });
    resolve();
  }

  pageHandler(req, res, next) {
    res.status(404).render(path.join(__dirname, '../views/index'), { route: req.url });
  }

  apiHandler(req, res, next) {
    new Responder(res).error(`Invalid API route ${req.method} ${req.originalUrl}`, 404);
  }
}

module.exports = MissingRoute;
