const mongoose = require('mongoose')
const { Schema } = mongoose;

const ToolSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    power_tool:{
        type: String,
        required: true
    },
    hourly_price: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    pictures: {
        type: [String],
        required: true
    },
    location:{
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Tool', ToolSchema);
