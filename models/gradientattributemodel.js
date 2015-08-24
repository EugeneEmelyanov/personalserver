/**
 * Created by eugene on 8/23/15.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var gradientAttributeSchema = new Schema({
    name: String,
    value: String,
    type: {type: String, enum: ["GradientStyle", "GradientSize"]}
});

module.exports = mongoose.model("GradientAttributeModel", gradientAttributeSchema);
