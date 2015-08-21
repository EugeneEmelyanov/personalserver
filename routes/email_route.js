/**
 * Created by eugene on 8/20/15.
 */
var EmailModel = require("../models/email_model.js");
var express = require('express');
var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.route('/email').get(function(req, resp) {
    resp.send({message: "test message"});
})

router.route('/email').post(function(req, resp) {
    var email = new EmailModel(req.body);

    email.save(function(err) {
        if (err) {
            return resp.send(err);
        }
        resp.send({message: "Email was sent"});
    })
});

module.exports = router;
