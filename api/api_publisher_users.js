(function () {	'use strict';
var users = require('../models/ModelUsers.js');
var post_my_work = require('../models/ModelPost_my_work.js');
var comments = require('../models/comments.js');
var send_work = require('../models/send_work.js');
var send_work_receiver = require('../models/send_work_receiver.js');
var notification = require('../models/notification.js');

module.exports = function(app){
	app
	.post('/submit_other_info_of_publisher_user',submit_other_info_of_publisher_user)
	.post('/get_publisher_user_profile',get_publisher_user_profile)
	.post('/modify_publisher_user_profile',modify_publisher_user_profile)
	.post('/upload_publisher_user_profile_image',upload_publisher_user_profile_image)
	.post('/get_all_profile_pic_of_publisher_user',get_all_profile_pic_of_publisher_user)
	.post('/post_publisher_user_works',post_publisher_user_works)
	.post('/get_publisher_dashboard_data1',get_publisher_dashboard_data1)
	.post('/get_publisher_dashboard_data',get_publisher_dashboard_data)
	.post('/get_all_publisher_user',get_all_publisher_user)
	.post('/update_publisher_user',update_publisher_user)
	
	.post('/get_work_history_of_publisher_user',get_work_history_of_publisher_user)
	.post('/get_publisher_unread_notification_count',get_publisher_unread_notification_count)
	;
	function submit_other_info_of_publisher_user(req,res){
		users.findOneAndUpdate({"_id": req.body.id}, {$set:{"firstname":req.body.update_info.firstname,"address":req.body.update_info.address,"lastname":req.body.update_info.lastname}}, {new: true}, function(err, doc){
			if(err){
				console.log("Something wrong when updating data!");
			}
			res.json(doc);
		});
	}
	function get_publisher_user_profile(req,res){
		users.find({"_id":req.body.id},function (err,data) {
			  if (err) {
			    res.json(err);
			  } else {
			    res.json(data);
			  }
		});
	}
	function modify_publisher_user_profile(req,res){
		console.log(req.body);
		users.findOneAndUpdate({"_id": req.body._id}, {$set:{"email":req.body.email,"firstname":req.body.firstname,"lastname":req.body.lastname,"address":req.body.address,"fb_link":req.body.fb_link,"twt_link":req.body.twt_link,"li_link":req.body.li_link,"price":req.body.price,"about_me":req.body.about_me,"sample_works":req.body.file_path}}, {new: true}, function(err, doc){
		    if(err){
		        console.log("Something wrong when updating data!");
		    }
		    res.json(doc);
		});
	}
	function upload_publisher_user_profile_image(req,res){
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
	function get_all_profile_pic_of_publisher_user(req,res){
		users.find({"_id":req.body.id},function (err,data) {
			  if (err) {
			    res.json(err);
			  } else {
			    res.json(data[0].user_profile_pic);
			  }
		});
	}
	function post_publisher_user_works(req,res){
		users.findOneAndUpdate({"_id": req.body._id}, {$push:{"post_my_work":req.body}}, {new: true}, function(err, doc){
		    if(err){
		        console.log("Something wrong when updating data!");
		    }
		    res.writeContinue();
		});
	}
	function get_publisher_dashboard_data(req,res){
		users.find({"_id":req.body._id},function (err,data) {
		  if (err) {
			    res.json(err);
			  } else {
			    res.json(data[0].post_my_work);
			  }
		});
	}
	function get_all_publisher_user(req,res){
		users.find({"role":'Publisher'},function (err,data) {
		  if (err) {
		    res.json(err);
		  } else {
		    res.json(data)
		  }
	});
	}
	
	function update_publisher_user(req,res){
		console.log(req.body)
		users.findOneAndUpdate({"_id": req.body.publisher_data._id}, {$set:{"email":req.body.publisher_data.email,"firstname":req.body.publisher_data.firstname,"lastname":req.body.publisher_data.lastname,"address":req.body.publisher_data.address}}, {new: true}, function(err, doc){
			if(err){
				console.log("Something wrong when updating data!");
			}
			res.json(doc);
			console.log(doc)
		});
	}
	
	function get_publisher_dashboard_data1(req,res){
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
	
	function get_work_history_of_publisher_user(req,res){
		console.log(req.body);
		send_work_receiver.aggregate([
	    {
	        $lookup:
	          {
	            from: "send_works",
	            localField: "send_work_id",
	            foreignField: "send_work_id",
	            as: "my_works"
	          }
	     },
	     {
	         $match: { "receiver_id": req.body.user_id }
	     },
	  ],function (err,data) {
			if (err) {
				res.json(err);
			} else {
				res.json(data);
			}
		})
	}
	function get_publisher_unread_notification_count(req,res){
		send_work_receiver.find({"receiver_id":req.body.user_id,read_status:0},{notification_details:1,_id:0,created_on:1},function(err,doc){
			if(err){
				res.json(err);
			}else{
				res.json(doc);
			}
		});
	}
	
}

})();