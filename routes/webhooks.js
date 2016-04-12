var express = require('express');
var router = express.Router();
var requestify = require("requestify");

router.route("/webhook").get(function (req, resp) {
    var token = req.query['hub.verify_token'];
    console.log("Query token: " + token);
    if (token === 'eugenes_secret_token') {
        resp.send(req.query['hub.challenge']);
        console.log("token is correct");
    }
    resp.send('Error, wrong validation token');
});

router.route("/webhook").post(function(req, resp) {
    console.log("New message from facebook");
    var messaging_events = req.body.entry[0].messaging;
    for (var i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;
        console.log("Sender Id: " + sender);
        if (event.message && event.message.text) {
            var text = event.message.text;
            requestify.post('http://api.carcode.com/carcode/v1/dealer/sms', {
                    "To":"+16264145621",
                    "Body":sender+"@"+text,
                    "cognitoId":"eugene_cognito_id",
                    "source":"chat"
                })
                .then(function(response) {
                    // Get the response body
                    response.getBody();
                    console.log("Succesfully post to carcode");
                    res.sendStatus(200);
                }, function(err){
                    res.sendStatus(500);
                    console.log(err);
                });
        }
    }
});

router.route("/carcode-webhook").post(function(req, resp){
    var inquiryId = req.body.inquiryId;
    if (inquiryId === 1442766) {
        var text = req.body.body;
        var sender = text.split("@")[0];
        var body = text.split("@")[1];
        sendTextMessage(sender, body);
    } else {
        console.log("Received message from carcode: " + req.body);
    }
});

var token = "CAAMBADbdWl0BAD4W66NCngjHeWOi5Y44UcmQuZCYv0c0RSrYJThzmc3KcrTnsDGg32sklteKzfKo4c5XEp0cTZCJNQfcSvZCZAvZBadgiaT9xQ1bLkYvhZAEfZBoPR1SWpBrv9gJzEkK2eCijj7J8vSdTIdZAs4pZC0NsYRoXdHW19MD3dLXlfyPJ2mCpn6Rj7X3GUQAsK1FKrwZDZD";

function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

module.exports = router;