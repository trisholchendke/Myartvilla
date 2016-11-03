var mongoose = require('mongoose');

var CommentsSchema = new mongoose.Schema({
  user_id: { type: String},
  post_id: { type: String},
  comment: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  profile_pic: { type: String },
  commented_on:{ type: Date,default: Date.now },
});

module.exports = mongoose.model('comments', CommentsSchema);