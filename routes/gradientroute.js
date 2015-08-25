/**
 * Created by eugene on 8/25/15.
 */
var router = require("express").Router();
var GradientAttributeModel = require("../models/gradientattributemodel");
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
})

module.exports = router;