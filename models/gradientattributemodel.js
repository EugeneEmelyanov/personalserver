/**
 * Created by eugene on 8/23/15.
 */

var mongoose = require("mongoose");
var CONSTANTS = require("./gradientconstants");
var Schema = mongoose.Schema;

var gradientAttributeSchema = new Schema({
    name: String,
    value: String,
    type: {type: String, enum: [CONSTANTS.GRADIENT_ATTRIBUTE_STYLE, CONSTANTS.GRADIENT_ATTRIBUTE_RADIAL_SIZE]}
});

module.exports = mongoose.model("GradientAttributeModel", gradientAttributeSchema);
