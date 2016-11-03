var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
	audience_id:{ type: String },
	theme_id:{ type: String },
	firstname:{ type: String },
	lastname:{ type: String },
	contact_no:{ type: String },
	email:{ type: String },
	winner:{ type: String },
	winner_on: { type: Date, default: Date.now },
	created_on:{ type: Date,default: Date.now }
});

module.exports = mongoose.model('audience', UsersSchema);