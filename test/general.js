const express = require("express");

function createApp() {
    app = express();
  
    var router = express.Router();
    router.route('/').get(function(req, res) {
      return res.json({goodCall: true});
    });
  
    app.use(router);
  
    return app;
  }

module.exports = createApp;