var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
	sender_id:{ type: String },
	file_path:{ type: String },
	post_description:{ type: String },
	post_name:{ type: String },
	send_work_id:{ type: String },
	notification_details:{ type: String },
	read_status:{ type: String },
	sender_firstname:{ type: String },
	sender_lastname:{ type: String },
	sender_contact_no:{ type: String },
	created_on:{ type: Date,default: Date.now },
	accept_status:{ type: String },
	file_type:{ type: String }
});

module.exports = mongoose.model('send_work', UsersSchema);