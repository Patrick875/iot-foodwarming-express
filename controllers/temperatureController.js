const Temperature = require("../models/temperature");
const asyncHandler = require("../utils/asyncHandler");
const socket = require("../utils/socket");

/**
 * GET
 * Get All temperature values
 * Takes value and potId from the body
 */
exports.getAllTemperatures = asyncHandler(async (req, res) => {
	const temperature = await Temperature.find({});
	return res.status(200).json({
		data: temperature,
		length: temperature.length,
		message: "success",
	});
});

/**
 * POST
 * Post a temperature
 */
// exports.createTemperature = asyncHandler(async (req, res) => {
// 	const { value, potId } = req.body;
// 	const newTemp = await Temperature.create({ value, potId });

// 	// Emitting both new-temperature and post events
// 	if (req.wss && req.wss.clients) {
// 		req.wss.clients.forEach((client) => {
// 			if (client.readyState === WebSocket.OPEN) {
// 				client.send(JSON.stringify({ type: "new-temperature", data: newTemp }));
// 				client.send(JSON.stringify({ type: "post", data: newTemp }));
// 			}
// 		});
// 	}

// 	return res.status(201).json({
// 		message: "success",
// 		data: newTemp,
// 	});
// });
exports.createTemperature = asyncHandler(async (req, res) => {
	const { value, potId } = req.body;
	const newTemp = await Temperature.create({ value, potId });

	const io = socket.getIo();
	// Emitting both new-temperature and post events
	io.emit("new-temperature", newTemp);
	io.emit("post", newTemp);

	return res.status(201).json({
		message: "success",
		data: newTemp,
	});
});
/**
 * DELETE
 * Deletes all records in the database
 */
exports.deleteAll = asyncHandler(async (req, res) => {
	await Temperature.deleteMany();
	return res.status(204).json({
		message: "success",
	});
});
