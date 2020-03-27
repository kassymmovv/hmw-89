const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description:String,
    image: String,
    publish:{
        type:Boolean,
        default:false,
        required:true
    }
});

const Author = mongoose.model('Author', ProductSchema);

module.exports = Author;