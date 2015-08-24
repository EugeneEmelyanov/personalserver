/**
 * Created by eugene on 8/23/15.
 */
var express = require('express');
var router = express.Router();
var PresetModel = require('../models/presetmodel');
var initialScirpt = require('../db_scripts/presets.json');



router.route("/create").get(function(req, resp) {

    var presetsCollection = initialScirpt.presets.map(function(item) {
        var preset = new PresetModel();
        preset.preset = item;
        return preset;
    });

    PresetModel.create(presetsCollection, onInsert);

    function onInsert(err, items) {
        if (err) {
            console.log("Error in inserting presets. " + err);
            resp.send(err);
        }
        resp.send(items);
    }
});

module.exports = router;