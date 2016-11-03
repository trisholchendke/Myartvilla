var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
	sender_id:{ type: String },
	sender_firstname:{ type: String },
	receiver_firstname:{ type: String },
	receiver_id:{ type: String },
	notification_id:{ type: String },
	read_status:{ type: String },
	notification_details:{ type: String },
	created_on:{ type: Date,default: Date.now }
});

module.exports = mongoose.model('notification', UsersSchema);