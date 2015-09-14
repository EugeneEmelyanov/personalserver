/**
 * Created by eugene on 8/20/15.
 */
var express = require('express');
var transport = require("../config/nodemailerconfig");
var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.route('/email').post(function(req, resp) {
    var body = req.body;
    transport.sendMail({
        from: body.email,
        to: "eugene.v.emelyanov@gmail.com",
        subject: body.name + " want to get in touch.",
        text: body.message
    }, function(err, data) {
        if (err) {
            resp.send({message: "Error sending email: " + err});
        } else {
            resp.send(data);
        }
    });
});

router.route('/ping').get(function(req, resp) {
    resp.send("Pong");
});

module.exports = router;
