const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: String,
  time: Date,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
user_name: {
  type: String,
  ref: 'User'
},
listing_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing'
}
  

})

module.exports = mongoose.model('Comment', commentSchema);