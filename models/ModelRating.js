var mongoose = require('mongoose');

var RatingSchema = new mongoose.Schema({
	user_id:{ type: String },
	post_id:{ type: String },
	rating_star:{ type: Number },
});

module.exports = mongoose.model('rating', RatingSchema);