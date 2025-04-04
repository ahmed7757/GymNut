const mongoose = require("mongoose");
module.exports = mongoose.model("tips", new mongoose.Schema({ tip: String }));