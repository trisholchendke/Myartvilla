(function () {	'use strict';
var users = require('../models/ModelUsers.js');
var post_my_work = require('../models/ModelPost_my_work.js');
var comments = require('../models/comments.js');
var rating = require('../models/ModelRating.js');

module.exports = function(app){
	
	app
	.post('/submit_other_info_of_artist_user',submit_other_info_of_artist_user)
	.post('/get_user_profile',get_user_profile)
	.post('/modify_user_profile',modify_user_profile)
	.post('/upload_profile_image',upload_profile_image)
//	.post('/get_all_profile_pic_of_user',get_all_profile_pic_of_user)
	.post('/post_my_works',post_my_works)
	.post('/get_artist_dashboard_data',get_artist_dashboard_data)
	.post('/get_all_posts',get_all_posts)
	.post('/get_artist_data',get_artist_data)
	.post('/get_all_artist_user',get_all_artist_user)
	.post('/update_artist_user',update_artist_user)
	.post('/like_post',like_post)
	.post('/unlike_post',unlike_post)
	.post('/guest_like_post',guest_like_post)
	.post('/guest_unlike_post',guest_unlike_post)
	.post('/submit_comment',submit_comment)
	.post('/delete_user',delete_user)
	.post('/get_user_info',get_user_info)
	.post('/get_average_rating_of_post',get_average_rating_of_post)
	.post('/get_rating_of_post',get_rating_of_post)
	.post('/update_rating_of_post',update_rating_of_post)
	.post('/save_rating_of_post',save_rating_of_post)
	.post('/get_share_post_data',get_share_post_data)
	;
	function get_share_post_data(req,res){
		console.log(req.body);
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
				                    	$lookup:
				                    	{
				                    		from: "ratings",
				                    		localField: "user_id",
				                    		foreignField: "user_id",
				                    		as: "rating"
				                    	},
				                  },		                 {
				                	 $match: { "post_id": req.body.post_id }
				                 }
				                 ],function (err,data) {
					if (err) {
						res.json(err);
					} else {
						if(data.length > 0){
							res.json(data);
							console.log(data);
						}
					}
				});
	}
	function save_rating_of_post(req,res){
//		console.log(req.body);
		var rating1 = new rating(req.body);
		rating1.save(function (err,data) {
			if (err) {
				res.json(err);
			} else {
				res.json(data);
//		    console.log(data);
			}
		});
	}
	function get_rating_of_post(req,res){
		console.log(req.body);
		rating.find({"user_id":req.body.user_id,"post_id":req.body.post_id},function (err,data) {
			if (err) {
				res.json(err);
			} else {
				res.json(data)
				console.log(data);
			}
		});
	}
	
	function update_rating_of_post(req,res){
//		console.log(req.body);
		rating.update({"user_id": req.body.user_id,"post_id":req.body.post_id}, {$set:{"rating_star":req.body.rating_star,"rating_percentage":req.body.rating_percentage}}, {multi: true}, function(err, doc){
		    if(err){
//		        console.log("Something wrong when updating data!");
		    }
		    res.json(doc);
//		    console.log(doc);
		});
	}
	function get_average_rating_of_post(req,res){
//		console.log(req.body);
		rating.aggregate(
				   [
					{
							$match: {post_id:req.body.post_id},
					},
				     {
				       $group:
				         {
				           _id: "$post_id",
				           avgRating: { $avg: '$rating_star' },
				         }
				     },
				   ],function (err,data) {
						if (err) {
							res.json(err);
						} else {
							console.log(data);
							if(data.length > 0){
//								res.json(data);
								post_my_work.update({"post_id":req.body.post_id}, {$set:{"post_rating_average":data[0].avgRating}}, {multi: true}, function(err, doc){
								    if(err){
								        console.log("Something wrong when updating data!");
								    }
//								    res.json(doc);
								    console.log(doc);
								});
							}
						}
					}
				)
		
	}
	function submit_other_info_of_artist_user(req,res){
		users.findOneAndUpdate({"_id": req.body.id}, {$set:{"firstname":req.body.update_info.firstname,"address":req.body.update_info.address,"lastname":req.body.update_info.lastname}}, {new: true}, function(err, doc){
			if(err){
//				console.log("Something wrong when updating data!");
			}
			res.json(doc);
		});
	}
	
	function get_user_profile(req,res){
		users.find({"_id":req.body.id},function (err,data) {
			  if (err) {
			    res.json(err);
			  } else {
			    res.json(data);
			  }
		});
	}
	
	function modify_user_profile(req,res){
		users.findOneAndUpdate({"_id": req.body._id}, {$set:{"email":req.body.email,"firstname":req.body.firstname,"lastname":req.body.lastname,"address":req.body.address,"fb_link":req.body.fb_link,"twt_link":req.body.twt_link,"li_link":req.body.li_link,"about_me":req.body.about_me}}, {new: true}, function(err, doc){
		    if(err){
//		        console.log("Something wrong when updating data!");
		    }
		    res.json(doc);
		});
	}
	
	function upload_profile_image(req,res){
//		console.log(req.body);
		users.findOneAndUpdate({"user_id": req.body.user_id}, {$set:{"profile_pic":req.body.file_path}}, {new: true}, function(err, doc){
		    if(err){
		        console.log("Something wrong when updating data!");
		    }else{
		    	res.json(doc);
		    }
		    res.writeContinue();
		});
	}
	
//	function get_all_profile_pic_of_user(req,res){
//		users.find({"_id":req.body.id},function (err,data) {
//			  if (err) {
//			    res.json(err);
//			  } else {
//			    res.json(data[0].user_profile_pic);
//			  }
//		});
//	}
	
	function post_my_works(req,res){
		req.body['post_id'] = req.body.post_id
		var user = new post_my_work(req.body);
		user.save(function (err,data) {
		  if (err) {
		    res.json(err);
		  } else {
		    res.json(data);
//		    console.log(data);
		  }
		});
	}
	
	
	function get_artist_dashboard_data(req,res){

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
		                    	$lookup:
		                    	{
		                    		from: "ratings",
		                    		localField: "user_id",
		                    		foreignField: "user_id",
		                    		as: "rating"
		                    	},
		                  },		                 {
		                	 $match: { "user_id": req.body.user_id }
		                 }
		                 ],function (err,data) {
			if (err) {
				res.json(err);
			} else {
				if(data.length > 0){
					res.json(data);
//					console.log(data);
				}
			}
		});
	}
	function get_user_info(req,res){
//		console.log(req.body);
		users.find({"user_id":req.body.user_id},function (err,data) {
			if (err) {
				res.json(err);
			} else {
				if(data.length > 0){
					res.json(data);
				}
//				console.log(data)
			}
		});
	}
	
	function get_artist_data(req,res){
		users.find(function (err,data) {
			if (err) {
				res.json(err);
			} else {
				if(data.length > 0){
					res.json(data);
				}
//				console.log(data)
			}
		});
	}
	
	function get_all_artist_user(req,res){
		users.find({"role":'Art And Photography'},function (err,data) {
		  if (err) {
		    res.json(err);
		  } else {
		    res.json(data)
		  }
	});
	}
	
	function get_all_posts(req,res){
//		console.log(req.body);
		post_my_work.find(function (err,data) {
			if (err) {
				res.json(err);
			} else {
				res.json(data);
//				console.log(data);
			}
		});
	}
	
	function update_artist_user(req,res){
//		console.log(req.body)
		users.findOneAndUpdate({"_id": req.body.artist_data._id}, {$set:{"email":req.body.artist_data.email,"firstname":req.body.artist_data.firstname,"lastname":req.body.artist_data.lastname,"address":req.body.artist_data.address}}, {new: true}, function(err, doc){
			if(err){
				console.log("Something wrong when updating data!");
			}
			res.json(doc);
//			console.log(doc)
		});
	}
	
	
	function like_post(req,res){
//		console.log(req.body);
		users.update(
				   { _id: req.body._id, "post_my_work.id": req.body.id },
				   { $set: { "post_my_work.$.like_count" : req.body.like_count,"post_my_work.$.unlike_count" : req.body.unlike_count,"post_my_work.$.like_flag" : req.body.like_flag,"post_my_work.$.unlike_flag" : req.body.unlike_flag } },function(err,doc){
					   res.json(doc)
				   });
	}
	
	function unlike_post(req,res){
//		console.log(req.body);
		users.update(
				{ _id: req.body._id, "post_my_work.id": req.body.id },
				{ $set: { "post_my_work.$.unlike_count" : req.body.unlike_count,"post_my_work.$.like_count" : req.body.like_count,"post_my_work.$.unlike_flag" : req.body.unlike_flag,"post_my_work.$.like_flag" : req.body.like_flag } },function(err,doc){
					res.json(doc)
				});
	}
	function guest_like_post(req,res){
//		console.log(req.body);
		users.update(
				{ _id: req.body._id, "post_my_work.id": req.body.id },
				{ $set: { "post_my_work.$.like_count" : req.body.like_count,"post_my_work.$.unlike_count" : req.body.unlike_count,"post_my_work.$.guest_like_flag" : req.body.guest_like_flag,"post_my_work.$.guest_unlike_flag" : req.body.guest_unlike_flag } },function(err,doc){
					res.json(doc)
				});
	}
	
	function guest_unlike_post(req,res){
//		console.log(req.body);
		users.update(
				{ _id: req.body._id, "post_my_work.id": req.body.id },
				{ $set: { "post_my_work.$.unlike_count" : req.body.unlike_count,"post_my_work.$.like_count" : req.body.like_count,"post_my_work.$.guest_unlike_flag" : req.body.guest_unlike_flag,"post_my_work.$.guest_like_flag" : req.body.guest_like_flag } },function(err,doc){
					res.json(doc)
				});
	}
	function submit_comment(req,res){
//		console.log(req.body);
		var comment = new comments(req.body);
		comment.save(function (err,data) {
		  if (err) {
		    res.json(err);
		  } else {
		    res.json(data);
		  }
		});
	}
	
	function delete_user(req,res){
		users.remove({_id:req.body.id},function(err,doc){
			res.json(doc);
		});
	}
	
}

})();