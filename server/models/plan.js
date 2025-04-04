const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema({
    goals:{
        type: Object,
        required: true
    },
    details:{
        type: Object,
        required: true,
    }
});

module.exports = mongoose.model("plan", planSchema);
