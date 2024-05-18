const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const socket = require("./utils/socket");
const app = require("./app");

dotenv.config({ path: "./.env" });

const server = http.createServer(app);
const io = socket.init(server);

io.on("connection", (socket) => {
	console.log("A client connected");
	socket.on("disconnect", () => {
		console.log("A client disconnected");
	});
});

const PORT = process.env.PORT || 3000;
const DB = process.env.ONLINE_DATABASE_URL;

mongoose
	.connect(DB)
	.then(() => {
		console.log("DB connection successful");
		server.listen(PORT, "0.0.0.0", () => {
			console.log(`App running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error("DB connection error:", err);
	});
// Ensure io is exported
