/**
 * Created by eugene on 8/20/15.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var emailSchema = new Schema({
    from:String,
    title:String,
    body:String,
    date:{type:Date, default:Date.now}
});

module.exports = mongoose.model("EmailModel", emailSchema);