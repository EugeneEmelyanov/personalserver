/**
 * Created by eugene on 8/23/15.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var presetSchema = new Schema({
    preset: [{
        location: String,
        color: String
    }]
});

module.exports = mongoose.model("PresetModel", presetSchema);