var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var transformRouter = require("./routes/transform");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));

app.use("/", indexRouter);
app.use("/in/", transformRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build"));
});

module.exports = app;
