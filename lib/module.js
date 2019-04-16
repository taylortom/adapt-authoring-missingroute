const { Module, Responder } = require('adapt-authoring-core');
const path = require('path');
/**
* Module for handling unknown routes in a user-friendly way.
*/
class MissingRoute extends Module {
  /**
  * Adds the route handlers. Note that no middleware/route handlers will be processed if added after this.
  * @param {Module} app App instance
  * @param {Function} resolve Function to call on fulfilment
  * @param {Function} reject Function to call on rejection
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
  /**
  * Handles 404 UI requests, returning an HTML page.
  * @param {ClientRequest} req The client request object
  * @param {ServerResponse} res The server response object
  * @param {function} next The next middleware function in the stack
  */
  pageHandler(req, res, next) {
    res.status(404).render(path.join(__dirname, '../views/index'), { route: req.url });
  }
  /**
  * Handles 404 API requests, returning an appropriate error.
  * @param {ClientRequest} req The client request object
  * @param {ServerResponse} res The server response object
  * @param {function} next The next middleware function in the stack
  */
  apiHandler(req, res, next) {
    new Responder(res).error(`Invalid API route ${req.method} ${req.originalUrl}`, 404);
  }
}

module.exports = MissingRoute;
