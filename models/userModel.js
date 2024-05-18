//jshint esversion:9
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	fullname: {
		type: String,
		trim: true,
		required: [true, "a user must have a name"],
	},
	email: {
		type: String,
		unique: [true, "account already exists"],
	},
	password: {
		type: String,
		required: [true, "user must provide a password"],
		select: false,
		minLength: 8,
	},
	resetPasswordToken: String,
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
