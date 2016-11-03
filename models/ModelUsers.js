var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
  user_name: {type: String, index: {unique: true, dropDups: true}},
  password: { type: String },
  email: { type: String},
  role: { type: String },
  firstname:{ type: String },
  fb_link:{ type: String },
  user_id:{ type: String },
  twt_link:{ type: String },
  li_link:{ type: String },
  lastname:{ type: String },
  contact_no:{ type: String },
  profile_pic:{ type: String },
  address:{ type: String },
  price:{ type: Number },
  sample_works:{ type: String },
  dob:{ type: Date },
  about_work:{ type: String },
  about_me:{ type: String },
  file_type:{ type: String }
});

module.exports = mongoose.model('users', UsersSchema);