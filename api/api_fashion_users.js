(function () {	'use strict';
var users = require('../models/ModelUsers.js');
var post_my_work = require('../models/ModelPost_my_work.js');
var comments = require('../models/comments.js');

module.exports = function(app){
	app
	.post('/submit_other_info_of_fashion_user',submit_other_info_of_fashion_user)
	.post('/get_fashion_user_profile',get_fashion_user_profile)
	.post('/modify_fashion_user_profile',modify_fashion_user_profile)
	.post('/upload_fashion_user_profile_image',upload_fashion_user_profile_image)
	.post('/get_all_profile_pic_of_fashion_user',get_all_profile_pic_of_fashion_user)
	.post('/post_fashion_user_works',post_fashion_user_works)
	.post('/get_fashion_dashboard_data',get_fashion_dashboard_data)
	.post('/get_fashion_dashboard_data1',get_fashion_dashboard_data1)
	.post('/get_all_fashion_user',get_all_fashion_user)
	.post('/get_all_short_film_user',get_all_short_film_user)
	.post('/update_fashion_user',update_fashion_user)
	.post('/update_short_film_user',update_short_film_user)
	;
	function submit_other_info_of_fashion_user(req,res){
		users.findOneAndUpdate({"_id": req.body.id}, {$set:{"firstname":req.body.update_info.firstname,"address":req.body.update_info.address,"lastname":req.body.update_info.lastname}}, {new: true}, function(err, doc){
			if(err){
				console.log("Something wrong when updating data!");
			}
			res.json(doc);
		});
	}
	function get_fashion_user_profile(req,res){
		users.find({"_id":req.body.id},function (err,data) {
			  if (err) {
			    res.json(err);
			  } else {
			    res.json(data);
			  }
		});
	}
	function modify_fashion_user_profile(req,res){
		users.findOneAndUpdate({"_id": req.body._id}, {$set:{"email":req.body.email,"firstname":req.body.firstname,"lastname":req.body.lastname,"address":req.body.address,"fb_link":req.body.fb_link,"twt_link":req.body.twt_link,"li_link":req.body.li_link,"about_me":req.body.about_me}}, {new: true}, function(err, doc){
		    if(err){
		        console.log("Something wrong when updating data!");
		    }
		    res.json(doc);
		});
	}
	function upload_fashion_user_profile_image(req,res){
		var new_item = 
		{
			file_type:req.body.file_type,	
			file_path:req.body.file_path,	
		}
		users.findOneAndUpdate({"_id": req.body._id}, {$push:{"user_profile_pic":new_item}}, {new: true}, function(err, doc){
		    if(err){
		        console.log("Something wrong when updating data!");
		    }
		    res.writeContinue();
		});
	}
	function get_all_profile_pic_of_fashion_user(req,res){
		users.find({"_id":req.body.id},function (err,data) {
			  if (err) {
			    res.json(err);
			  } else {
			    res.json(data[0].user_profile_pic);
			  }
		});
	}
	function post_fashion_user_works(req,res){
		users.findOneAndUpdate({"_id": req.body._id}, {$push:{"post_my_work":req.body}}, {new: true}, function(err, doc){
		    if(err){
		        console.log("Something wrong when updating data!");
		    }
		    res.writeContinue();
		});
	}
	function get_fashion_dashboard_data(req,res){
		users.find({"_id":req.body._id},function (err,data) {
		  if (err) {
			    res.json(err);
			  } else {
			    res.json(data[0].post_my_work);
			  }
		});
	}
	
function get_all_fashion_user(req,res){
		
		users.find({"role":'Fashion'},function (err,data) {
		  if (err) {
		    res.json(err);
		  } else {
		    res.json(data)
		   
		  }
		  
	});
	}
function get_all_short_film_user(req,res){
	
	users.find({"role":'Short Films'},function (err,data) {
		if (err) {
			res.json(err);
		} else {
			res.json(data)
			
		}
		
	});
}
	
	function update_fashion_user(req,res){
		console.log(req.body)
		users.findOneAndUpdate({"_id": req.body.fashion_data._id}, {$set:{"email":req.body.fashion_data.email,"firstname":req.body.fashion_data.firstname,"lastname":req.body.fashion_data.lastname,"address":req.body.fashion_data.address}}, {new: true}, function(err, doc){
			if(err){
				console.log("Something wrong when updating data!");
			}
			res.json(doc);
			console.log(doc)
		});
	}
	function update_short_film_user(req,res){
		console.log(req.body)
		users.findOneAndUpdate({"_id": req.body.short_film_data._id}, {$set:{"email":req.body.short_film_data.email,"firstname":req.body.short_film_data.firstname,"lastname":req.body.short_film_data.lastname,"address":req.body.short_film_data.address}}, {new: true}, function(err, doc){
			if(err){
				console.log("Something wrong when updating data!");
			}
			res.json(doc);
			console.log(doc)
		});
	}
	
	function get_fashion_dashboard_data1(req,res){
		console.log(req.body);
		post_my_work.find({"user_id":req.body.user_id},function (err,data) {
			if (err) {
				res.json(err);
			} else {
				res.json(data);
//				console.log(data);
			}
		});
	}
		
}

})();