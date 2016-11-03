var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
	user_id:{ type: String },
	theme_id:{ type: String },
	theme_img:{ type: String },
	theme_description:{ type: String },
	theme_name:{ type: String },
	target_audience:{ type: String },
	about_theme:{ type: String },
	theme_prize:{ type: Number },
	file_type:{ type: String }
});

module.exports = mongoose.model('themes', UsersSchema);