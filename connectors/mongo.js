var mongoose = require("mongoose");
let data = require("./schema.js");

var Model = mongoose.model('Model', data);
mongoose.connect(`mongodb://localhost:27017/fsp`);

module.exports = Model;
