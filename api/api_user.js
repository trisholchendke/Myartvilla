(function () {	'use strict';

var users = require('../models/ModelUsers.js');
var base64 = require('base-64');
var utf8 = require('utf8');

module.exports = function(app){
	app
	.post('/register_user',register_user)
	.post('/login_user',login_user)
	.post('/update_admin_user_psw',update_admin_user_psw)
	;
	function register_user(req,res){
		var text = req.body.password;
		var bytes = utf8.encode(text);
		var encoded = base64.encode(bytes);
		req.body['password'] = encoded;
		req.body['fb_link'] = "";
		req.body['twt_link'] = "";
		req.body['li_link'] = "";
		req.body['profile_pic'] = "";
		req.body['sample_works'] = "";
		var timestamp = Math.floor(new Date().getTime()/1000);
		req.body['user_id'] = timestamp;
		
		var user = new users(req.body);
		user.save(function (err,data) {
		  if (err) {
		    res.json(err);
		  } else {
		    res.json(data);
		  }
		});
	}
	
	function login_user(req,res){
		var text = req.body.password;
		var bytes = utf8.encode(text);
		var encoded = base64.encode(bytes);
		req.body['password'] = encoded;
		users.find({"user_name":req.body.user_name,"password":req.body.password},function (err,data) {
			  if (err) {
			    res.json(err);
			  } else {
			    res.json(data);
			  }
		});
	}
	function update_admin_user_psw(req,res){
		console.log(req.body.admin_data.new_psw);
		var text = req.body.admin_data.new_psw;
		var bytes = utf8.encode(text);
		var encoded = base64.encode(bytes);
		users.update({_id:req.body.user_id},{"password":encoded},function (err,data) {
			if (err) {
				res.json(err);
			} else {
				res.json(data);
			}
		});
	}
}

})();