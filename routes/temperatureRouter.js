const express = require("express");
const temperatureController = require("../controllers/temperatureController");
const router = express.Router();

/**
 *
 */

router
	.route("/")
	.get(temperatureController.getAllTemperatures)
	.post(temperatureController.createTemperature)
	.delete(temperatureController.deleteAll);

module.exports = router;
