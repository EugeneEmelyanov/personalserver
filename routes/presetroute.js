/**
 * Created by eugene on 8/24/15.
 */
var express = require("express");
var router = express.Router();
var PresetModel = require("../models/presetmodel");

router.route('/presets').get(function(req, resp) {
    PresetModel.find({}, function(err, presets) {
        if (err) {
            resp.send({message: "Error in presets: " + err});
        }
        resp.send({
            presets: presets.map(function(item) {
                return item.preset;
            })
        });
    })
});

module.exports = router;