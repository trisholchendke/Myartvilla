var mongoose = require('mongoose');

var UsersSchema = new mongoose.Schema({
	disable_button:{ type: String },
	send_work_id:{ type: String },
	notification_details:{ type: String },
	read_status:{ type: String },
	receiver_id:{ type: String },
	receiver_firstname:{ type: String },
	receiver_lastname:{ type: String },
	receiver_contact_no:{ type: String },
	created_on:{ type: Date,default: Date.now },
	accept_status:{ type: String }
});

module.exports = mongoose.model('send_work_receiver', UsersSchema);