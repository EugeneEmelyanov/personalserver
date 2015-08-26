/**
 * Created by eugene on 8/25/15.
 */
var router = require("express").Router();
var GradientAttributeModel = require("../models/gradientattributemodel");
var GradientDirectionModel = require("../models/gradientdirectionmodel");
var CONSTANTS = require("../models/gradientconstants")

router.route("/gradientstyles").get(function(req, resp) {
    GradientAttributeModel.find({type:CONSTANTS.GRADIENT_ATTRIBUTE_STYLE}, function(err, items) {
        resp.send({gradientStyles: items});
    })
});

router.route("/radialgradientsizes").get(function(req, resp) {
    GradientAttributeModel.find({type:CONSTANTS.GRADIENT_ATTRIBUTE_RADIAL_SIZE}, function(err, items) {
        resp.send({radialGradientSizes: items});
    })
});

router.route("/lineardirections").get(function(req, resp) {
    GradientDirectionModel.find({type:CONSTANTS.GRADIENT_LINEAR_DIRECTION}, function(err, items) {
        resp.send({linearGradientDirections: items});
    })
});

router.route("/radialpositions").get(function(req, resp) {
    GradientDirectionModel.find({type:CONSTANTS.GRADIENT_RADIAL_POSTION}, function(err, items) {
        resp.send({radialGradientPositions: items});
    })
})

module.exports = router;