//https://www.freecodecamp.org/news/mongoose101/
//https://medium.com/swlh/populate-subdocument-in-graphql-4e7f9ede5a1c

const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password:{
        type: String,
        required: false
    },
    location:{
        type:String,
        required: false
    },
    preferred_currency:{
      type:String,
      required: true
    },
    ethereum_address:{
      type:String,
      required: false
    },
    tools:{
        type: [Schema.Types.ObjectId],
        required: false,
        ref: 'Tool'
    }
});



module.exports = mongoose.model('User', UserSchema);
