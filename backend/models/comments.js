const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  

})

module.exports = mongoose.model('Comment', commentSchema);