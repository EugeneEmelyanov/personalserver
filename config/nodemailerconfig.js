
/**
 * Created by eugene on 8/26/15.
 */
var nodeMailer = require("nodemailer");
var transport;

function createTransport() {
     return nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: "nodemailertransport@gmail.com",
            pass: "nodemailertransport"
        }
    });
}

function getTransport() {
    if (typeof transport === "undefined" || transport == null) {
        transport = createTransport();
    }
    return transport;
}

module.exports = getTransport();