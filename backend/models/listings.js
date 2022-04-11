const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const listingSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  desc: String,
  price: Number,
  // swap: Boolean,
    img1: String, 
    img2: String,
    img3: String,  
    size1: Number,
    size2: String,
  type: String,
  brand: String,
  color: String,
  // style: String,
  date: Date,
  gender: String,
  user_id: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  user_name: 
  {
    type: String,
    ref: 'User'
  },
  comment: [],
  comment_id: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
      // location: String,
  // tags: 
  // {
  //     String
  // }
})

module.exports = mongoose.model('Listing', listingSchema);