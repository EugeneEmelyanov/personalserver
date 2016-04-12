var express = require('express');
var router = express.Router();

router.route("/webhook").get(function (req, resp) {
    var token = req.query['hub.verify_token'];
    console.log("Query token: " + token);
    if (token === 'eugenes_secret_token') {
        resp.send(req.query['hub.challenge']);
        console.log("token is correct");
    }
    resp.send('Error, wrong validation token');
});

module.exports = router;