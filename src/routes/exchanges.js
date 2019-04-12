var ccxt = require ('ccxt')
  , CircularJSON = require('circular-json')
  , express = require('express');

module.exports =  function(app) {
  var router = express.Router();

  app.use('/exchanges', router);

  // from https://strongloop.github.io/strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/#using-es7-asyncawait
  let wrap = fn => (...args) => fn(...args).catch(args[2])

  router.get('/', function(req, res, next) {
    res.send(CircularJSON.stringify(ccxt.exchanges));
  });

  router.post('/:exchangeName/:methodName', wrap(async function(req, res) {
    var exchangeName = req.params.exchangeName;
    var methodName = req.params.methodName
    var reqBody = req.body;

    var exchange = new ccxt[exchangeName]({
      apiKey: req.header('apiKey'),
      secret: req.header('secret'),
      timeout: req.header('timeout'),
    });

    if (!exchange) {
      res.sendStatus(404);
      return;
    }

    var response = await exchange[methodName].apply(exchange, reqBody);
    res.send(CircularJSON.stringify(response));
  }));
}
