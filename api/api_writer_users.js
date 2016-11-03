(function () {	'use strict';
var users = require('../models/ModelUsers.js');
var post_my_work = require('../models/ModelPost_my_work.js');
var comments = require('../models/comments.js');
var send_work = require('../models/send_work.js');
var notification = require('../models/notification.js');
var send_work_receiver = require('../models/send_work_receiver.js');

module.exports = function(app){
	app
	.post('/submit_other_info_of_writer_user',submit_other_info_of_writer_user)
	.post('/get_writer_user_profile',get_writer_user_profile)
	.post('/modify_writer_user_profile',modify_writer_user_profile)
	.post('/upload_writer_user_profile_image',upload_writer_user_profile_image)
	.post('/get_all_profile_pic_of_writer_user',get_all_profile_pic_of_writer_user)
	.post('/post_writer_user_works',post_writer_user_works)
	.post('/get_writer_dashboard_data',get_writer_dashboard_data)
	.post('/get_writer_dashboard_data1',get_writer_dashboard_data1)
	.post('/get_all_writer_user',get_all_writer_user)
	.post('/update_writer_user',update_writer_user)
	.post('/store_data_of_send_my_works',store_data_of_send_my_works)
	.post('/get_rolewise_data',get_rolewise_data)
	.post('/send_to_him',send_to_him)
	.post('/get_user_info',get_user_info)
	.post('/writer_giveaways_history',writer_giveaways_history)
	.post('/get_related_receiver_ids',get_related_receiver_ids)
	.post('/get_work_history_of_writer_user',get_work_history_of_writer_user)
	.post('/get_details_of_send_work',get_details_of_send_work)
	.post('/get_all_notification',get_all_notification)
	.post('/get_writer_unread_notification_count',get_writer_unread_notification_count)
	.post('/mark_all_as_read',mark_all_as_read)
	.post('/get_post_work_history_data',get_post_work_history_data)
	;
	
	function get_post_work_history_data(req,res){

		post_my_work.aggregate([
		                 
		                 {
		                	 $lookup:
		                	 {
		                		 from: "users",
		                		 localField: "user_id",
		                		 foreignField: "user_id",
		                		 as: "post_owner"
		                	 }
		                 
		                 },
		                 {
		                	 $lookup:
		                	 {
		                		 from: "comments",
		                		 localField: "post_id",
		                		 foreignField: "post_id",
		                		 as: "post_comments"
		                	 }
		                 },
		                 {
		                	 $match: { "user_id": req.body.user_id }
		                 }
		                 ],function (err,data) {
			if (err) {
				res.json(err);
			} else {
				
					res.json(data);
				
				
			}
		});
	}
	
	function submit_other_info_of_writer_user(req,res){
		users.findOneAndUpdate({"_id": req.body.id}, {$set:{"firstname":req.body.update_info.firstname,"address":req.body.update_info.address,"lastname":req.body.update_info.lastname}}, {new: true}, function(err, doc){
			if(err){
				console.log("Something wrong when updating data!");
			}
			res.json(doc);
		});
	}
	function get_writer_user_profile(req,res){
		users.find({"_id":req.body.id},function (err,data) {
			  if (err) {
			    res.json(err);
			  } else {
			    res.json(data);
			  }
		});
	}
	function modify_writer_user_profile(req,res){
		console.log(req.body.coming_object);
		users.findOneAndUpdate({"_id": req.body.coming_object._id}, {$set:{"email":req.body.coming_object.email,"firstname":req.body.coming_object.firstname,"lastname":req.body.coming_object.lastname,"address":req.body.coming_object.address,"fb_link":req.body.coming_object.fb_link,"twt_link":req.body.coming_object.twt_link,"li_link":req.body.coming_object.li_link,"dob":req.body.date_of_birth,"about_me":req.body.coming_object.about_me,"about_work":req.body.coming_object.about_work}}, {new: true}, function(err, doc){
		    if(err){
		        console.log("Something wrong when updating data!");
		    }
		    res.json(doc);
		});
	}
	function upload_writer_user_profile_image(req,res){
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
	function get_all_profile_pic_of_writer_user(req,res){
		users.find({"_id":req.body.id},function (err,data) {
			  if (err) {
			    res.json(err);
			  } else {
			    res.json(data[0].user_profile_pic);
			  }
		});
	}
	function post_writer_user_works(req,res){
		users.findOneAndUpdate({"_id": req.body._id}, {$push:{"post_my_work":req.body}}, {new: true}, function(err, doc){
		    if(err){
		        console.log("Something wrong when updating data!");
		    }
		    res.writeContinue();
		});
	}
	function get_writer_dashboard_data(req,res){
		users.find({"_id":req.body._id},function (err,data) {
		  if (err) {
			    res.json(err);
			  } else {
			    res.json(data[0].post_my_work);
			  }
		});
	}
	
function get_all_writer_user(req,res){
		
		users.find({"role":'Writer'},function (err,data) {
		  if (err) {
		    res.json(err);
		  } else {
		    res.json(data)
		   
		  }
		  
	});
	}
	
	function update_writer_user(req,res){
		console.log(req.body)
		users.findOneAndUpdate({"_id": req.body.writer_data._id}, {$set:{"email":req.body.writer_data.email,"firstname":req.body.writer_data.firstname,"lastname":req.body.writer_data.lastname,"address":req.body.writer_data.address}}, {new: true}, function(err, doc){
			if(err){
				console.log("Something wrong when updating data!");
			}
			res.json(doc);
			console.log(doc)
		});
	}
	
	function get_writer_dashboard_data1(req,res){
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
	
	function store_data_of_send_my_works(req,res){
		var send_work1 = new send_work(req.body);
		send_work1.save(function(err,doc){
			if(err){
				res.json(err);
			}else{
				res.json(doc);
			}
		});
	}
	
	function get_rolewise_data(req,res){
		users.aggregate([
		                 { 
		                	 $match: 
		                	 { 
		                		 $or: 
		                			 [ 
		                			   {
		                				   price: 
		                				   { 
		                					   $gte: Number(req.body.min_price), $lte: Number(req.body.max_price) 
		                					} 
		                			   }, 
		                			   { 
		                				   role: req.body.role 
		                				}, 
		                			   ] 
		                	 } 
		                 },
		                 {
		                	 $lookup:
		                		 {
		                		 	from:"send_work_receivers",
		                		 	localField:"user_id",
		                		 	foreignField:"receiver_id",
		                		 	as:"send_to_him"
		                		 },
		                		
		                 },
		                 ],function(err,doc){
				if(err){
					res.json(err);
				}else{
					res.json(doc);
				}
			
		});
	}
	
	function send_to_him(req,res){
		console.log(req.body);
		var send_work_receiver1 = new send_work_receiver(req.body);
		send_work_receiver1.save(function(err,doc){
			if(err){
				res.json(err);
			}else{
				res.json(doc);
			}
		});
	}
	
	function get_user_info(req,res){
		users.find({"user_id":req.body.user_id},function (err,data) {
			  if (err) {
			    res.json(err);
			  } else {
			    res.json(data);
			  }
		});
	}
	function writer_giveaways_history(req,res){
		send_work.find({"sender_id":req.body.user_id},function (err,data) {
			if (err) {
				res.json(err);
			} else {
				res.json(data);
			}
		});
	}
	function get_related_receiver_ids(req,res){
		send_work_receiver.find({"send_work_id":req.body.send_work_id},{"receiver_id":1,_id:0},function (err,data) {
			if (err) {
				res.json(err);
			} else {
				res.json(data);
			}
		});
	}
	
	
	function get_work_history_of_writer_user(req,res){
		console.log(req.body);
		send_work.aggregate([
	    {
	        $lookup:
	          {
	            from: "send_work_receivers",
	            localField: "send_work_id",
	            foreignField: "send_work_id",
	            as: "my_works"
	          }
	     },
	     {
	         $match: { "sender_id": req.body.user_id }
	     },
	  ],function (err,data) {
			if (err) {
				res.json(err);
			} else {
				res.json(data);
			}
		})
	}
	
	function get_my_all_notification(req,res){
		send_work.find({"sender_id":req.body.user_id},{notification_details:1,_id:0},function(err,doc){
			if(err){
				res.json(err);
			}else{
				res.json(doc);
			}
		});
	}
	function get_details_of_send_work(req,res){
		send_work.aggregate([
		                              {
		                            	  $lookup:
		                            		  {
		                            		  	from:"send_work_receivers",
		                            		  	localField:"send_work_id",
		                            		  	foreignField:"send_work_id",
		                            		  	as:"my_works"
		                            		  }
		                              },
		                              {
		                            	  $match:
		                            		  {
		                            		  	"send_work_id":req.body.send_work_id
		                            		  }
		                              }
		                              ],function(err,doc){
			if(err){
				res.json(err);
			}else{
				res.json(doc);
			}
		});
	}
	
	function get_all_notification(req,res){
		notification.find({receiver_id:req.body.user_id,"notification_details":{$exists:true}},function(err,doc){
			if(err){
				res.json(err);
			}else{
				res.json(doc);
			}
		});
	}
	function get_writer_unread_notification_count(req,res){
		notification.find({receiver_id:req.body.user_id,read_status:0},function(err,doc){
			if(err){
				res.json(err);
			}else{
				res.json(doc);
			}
		});
	}
	function mark_all_as_read(req,res){
		notification.update({receiver_id:req.body.user_id,read_status:0},{$set:{read_status:1}},{ multi: true},function(err,doc){
			if(err){
				res.json(err);
			}else{
				res.json(doc);
			}
		});
	}
		
}

})();