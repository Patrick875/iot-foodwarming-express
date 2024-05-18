const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./routes/authRouter");
const tempRouter = require("./routes/temperatureRouter");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.options("*", cors());

//api routes

app.use("/api/auth", authRouter);
app.use("/api/temp", tempRouter);

module.exports = app;
