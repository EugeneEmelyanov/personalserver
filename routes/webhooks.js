var express = require('express');
var router = express.Router();
var requestify = require("requestify");
var request = require("request");
var WebScoketClient = require("websocket").client;

router.route("/webhook").get(function (req, resp) {
    var token = req.query['hub.verify_token'];
    console.log("Query token: " + token);
    if (token === 'eugenes_secret_token') {
        resp.send(req.query['hub.challenge']);
        console.log("token is correct");
    } else {
        resp.error('Error, wrong validation token');
    }
});

router.route("/webhook").post(function(req, resp) {
    console.log("New message from facebook");
    var messaging_events = req.body.entry[0].messaging;
    var success = false;
    for (var i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;
        console.log("Sender Id: " + sender);
        if (event.message && event.message.text) {
            var text = event.message.text;
            console.log("Sending message to CarCode: " + text);
            request({
                url: 'http://api.carcode.com/carcode/v1/dealer/sms',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                form: {
                    "To":"+16264145621",
                    "Body":sender + "@" + text,
                    "From":"",
                    "source":"chat",
                    "cognitoId":"eugenes_cognito_id"
                }
            }, function(error, response, body) {
                if (error) {
                    console.log('Error sending message: ', error);
                } else {
                    success = true;
                }
            });

        }
    }
    setTimeout(function(){
        console.log("Succesfully post to carcode: " + success);
        resp.send("Ok");

    }, 200);
});

var client = new WebScoketClient();
client.on("connectFailed", function(err) {
    console.log('ws err');
});

client.on("connect", function(connection){
    console.log("ws connected");

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            var data = JSON.parse(message.utf8Data);
            console.log("Received: '" + message.utf8Data + "'");
            if (data.event === "reply") {
                var text = data.data.body;
                var sender = text.split("@")[0];
                var body = text.split("@")[1];
                sendTextMessage(sender, body);
            }

        }
    });

});

client.connect('ws://api.carcode.com/ws/carcode/chat/customer/inquiry/1444763');

var token = "CAAMBADbdWl0BAD4W66NCngjHeWOi5Y44UcmQuZCYv0c0RSrYJThzmc3KcrTnsDGg32sklteKzfKo4c5XEp0cTZCJNQfcSvZCZAvZBadgiaT9xQ1bLkYvhZAEfZBoPR1SWpBrv9gJzEkK2eCijj7J8vSdTIdZAs4pZC0NsYRoXdHW19MD3dLXlfyPJ2mCpn6Rj7X3GUQAsK1FKrwZDZD";

function sendTextMessage(sender, text) {
    var messageData = {
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