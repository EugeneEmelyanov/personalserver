/**
 * Created by eugene on 8/23/15.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var gradientDirectionSchema = new Schema({
    name: String,
    value: String,
    safariValue: String,
    type: {type:String, enum: ["linear", "gradient"]}
});

module.exports = mongoose.model("GradientDirectionModel", gradientDirectionSchema);
