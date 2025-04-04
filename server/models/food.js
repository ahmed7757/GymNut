const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number,
        required: true,
    },
    carbs: {
        type: Number,
        required: true,
    },
    fats: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        default: "",
    },

});

module.exports = mongoose.model("food", foodSchema);