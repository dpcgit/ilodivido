const mongoose = require('mongoose')
const { Schema } = mongoose;

const ToolSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    power_tool:{
        type: String
    },
    hourly_price: {
        type: String
    },
    price: {
        type: String
    },
    pictures: {
        type: String
    },
    location:{
        type: String
    }

})

module.exports = mongoose.model('Tool', ToolSchema);