/**
 * Created by eugene on 8/23/15.
 */
var mongoose = require("mongoose");
var CONSTANTS = require("./gradientconstants");
var Schema = mongoose.Schema;

var gradientDirectionSchema = new Schema({
    name: String,
    value: String,
    safariValue: String,
    type: {type:String, enum: [CONSTANTS.GRADIENT_LINEAR_DIRECTION, CONSTANTS.GRADIENT_RADIAL_POSTION]}
});

module.exports = mongoose.model("GradientDirectionModel", gradientDirectionSchema);
