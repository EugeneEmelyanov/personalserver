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
var presetJSON = require('../db_scripts/presets.json');

var GradientAttributeModel = require("../models/gradientattributemodel");
var gradientStylesJSON = require('../db_scripts/gradientStyles.json');
var radialGradientSizeJSON = require("../db_scripts/radialGradientSizes.json");

var GradientDirectionModel = require("../models/gradientdirectionmodel");
var linearDirectionsJSON = require("../db_scripts/linearGradientDirections");
var radialGradientPositionsJSON = require("../db_scripts/radialGradientPositions");


router.route("/create/presets").get(function (req, resp) {

    var presetsCollection = presetJSON.presets.map(function (item) {
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
});

router.route("/create/directions").get(function (req, res) {
    var directionsCollection = linearDirectionsJSON.linearGradientDirections.map(function (item) {
        return new GradientDirectionModel({
            name: item.name,
            value: item.value,
            safariValue: item.safariValue,
            type: CONSTANTS.GRADIENT_LINEAR_DIRECTION
        });


    });

    var positionsCollection = radialGradientPositionsJSON.radialGradientPositions.map(function (item) {
        return new GradientDirectionModel({
            name: item.name,
            value: item.value,
            safariValue: item.safariValue,
            type: CONSTANTS.GRADIENT_RADIAL_POSTION
        });
    });

    GradientDirectionModel.create(directionsCollection.concat(positionsCollection), onInsert);

    function onInsert(err, items) {
        if (err) {
            res.send({message: "Error creating directions"});
        } else {
            res.send(items);
        }
    }
});

module.exports = router;