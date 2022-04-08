const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  profile_img: String,
  email: String,
  listings: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
  }
    // location: String,
  // rating: Number,
  // comments:
  // {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Comment'
  // }
  

})

module.exports = mongoose.model('User', userSchema);