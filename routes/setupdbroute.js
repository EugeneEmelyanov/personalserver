/**
 * Created by eugene on 8/23/15.
 */

/*
 Create initial db structure. Used mainly for testing and to test data model.
 */
var express = require('express');
var router = express.Router();
var CONSTANTS = require("../models/gradientconstants");
var PresetModel = require('../models/presetmodel');
var GradientAttributeModel = require("../models/gradientattributemodel");
var initialScirpt = require('../db_scripts/presets.json');
var gradientStylesJSON = require('../db_scripts/gradientStyles.json');
var radialGradientSizeJSON = require("../db_scripts/radialGradientSizes.json");


router.route("/create/presets").get(function (req, resp) {

    var presetsCollection = initialScirpt.presets.map(function (item) {
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

router.route("/create/styles").get(function (req, res) {
    var stylesCollection = gradientStylesJSON.gradientStyles.map(function (item) {
        return new GradientAttributeModel({
            name: item.name,
            value: item.value,
            type: CONSTANTS.GRADIENT_ATTRIBUTE_STYLE
        });
    })
    var radialGradientsSizeCollection = radialGradientSizeJSON.radialGradientSizes.map(function (item) {
        return new GradientAttributeModel({
            name: item.name,
            value: item.value,
            type: CONSTANTS.GRADIENT_ATTRIBUTE_RADIAL_SIZE
        });
    });

    GradientAttributeModel.create(stylesCollection.concat(radialGradientsSizeCollection), onInsert);

    function onInsert(err, items) {
        if (err) {
            res.send({message: "Error creating attributes: " + err})
        } else {
            res.send(items);
        }
    }
})

module.exports = router;