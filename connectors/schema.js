var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const  data = new Schema({
    fsp_id: String,
    script: String,
    dest_url: String
}, {
    collection: 'data'
});
module.exports = data;