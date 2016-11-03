var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
	user_id:{ type: String },
	id:{ type: String },
	post_user_id:{ type: String },
	file_path:{ type: String },
	post_description:{ type: String },
	post_name:{ type: String },
	post_id:{ type: String },
	post_subcategory:{ type: String },
	post_maincategory:{ type: String },
	post_rating_average:{ type: String },
	post_country:{ type: String },
	age_group:{ type: Number },
	file_type:{ type: String },
	genre:{ type: String }, 
	post_role:{ type: String }, 
});

module.exports = mongoose.model('posts', UsersSchema);