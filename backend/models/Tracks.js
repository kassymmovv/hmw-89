const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  album:{
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  },
  number:{
    type:String,
    required:true
  },
  duration:{
    type:String,
    required:true
  },
  publish:{
    type:Boolean,
    default:false,
    required:true
  }
});

const Track = mongoose.model('Track', CategorySchema);

module.exports = Track;