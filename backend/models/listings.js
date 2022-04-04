const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const listingSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  desc: String,
  price: Number,
  swap: Boolean,
  img: {
    img1: String, 
    img2: String,
    img3: String
  },
  size: {
    size1: Number,
    size2: String,
  },
  type: String,
  brand: String,
  color: String,
  style: String,
  date: new date(),
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
} ,
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
}
})

module.exports = mongoose.model('Listing', listingSchema);