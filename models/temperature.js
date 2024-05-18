const mongoose = require("mongoose");

const temperatureSchema = mongoose.Schema({
	potId: {
		type: String,
	},
	value: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Temperature = mongoose.model("Temperature", temperatureSchema);

module.exports = Temperature;
