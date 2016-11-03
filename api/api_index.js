(function () {	'use strict';

	var users = require('../models/ModelUsers.js');
	var post_my_work = require('../models/ModelPost_my_work.js');
	var comments = require('../models/comments.js');
	var rating = require('../models/ModelRating.js');

module.exports = function(app){
	
	app
	.post('/submit_comment',submit_comment)
	.post('/get_painting_art_data',get_painting_art_data)
	.post('/get_data_by_user_id',get_data_by_user_id)
	.post('/get_average_rating_of_post_by_guest',get_average_rating_of_post_by_guest)
	.post('/get_rating_of_post_by_guest',get_rating_of_post_by_guest)
	.post('/update_rating_of_post_by_guest',update_rating_of_post_by_guest)
	.post('/save_rating_of_post_by_guest',save_rating_of_post_by_guest)
	;
	function save_rating_of_post_by_guest(req,res){
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
	
	function get_rating_of_post_by_guest(req,res){
//		console.log(req.body);
		rating.find({"guest_user_id":req.body.guest_user_id,"post_id":req.body.post_id},function (err,data) {
			if (err) {
				res.json(err);
			} else {
				res.json(data)
//				console.log(data);
			}
		});
	}
	
	function update_rating_of_post_by_guest(req,res){
//		console.log(req.body);
		rating.update({"user_id": req.body.user_id,"post_id":req.body.post_id}, {$set:{"rating_star":req.body.rating_star,"rating_percentage":req.body.rating_percentage}}, {multi: true}, function(err, doc){
		    if(err){
//		        console.log("Something wrong when updating data!");
		    }
		    res.json(doc);
//		    console.log(doc);
		});
	}
	
	function get_average_rating_of_post_by_guest(req,res){
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
	
	function submit_comment(req,res){
		console.log(req.body);
		users.update(
				{ _id: req.body._id, "post_my_work.id": req.body.id },
				{ $push: { "post_my_work.$.comments" : req.body.comment } },function(err,doc){
					res.json(doc)
				});
	}
	
	function get_painting_art_data(req,res){
		post_my_work.aggregate([
		                        {
		                        	$lookup:
		                        		{
		                        			from:"users",
		                        			localField:"user_id",
		                        			foreignField:"user_id",
		                        			as:"post_owner"
		                        		}
		                        },
		                        {
		                        	$lookup:
		                        		{
		                        			from:"comments",
		                        			localField:"post_id",
		                        			foreignField:"post_id",
		                        			as:"post_comments"
		                        			
		                        		}
		                        },
		                        {
		                        	$match:
		                        	{
		                        		"post_role":req.body.category_name
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
	
	function get_data_by_user_id(req,res){
		console.log(req.body.user_id);
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
						if(data.length > 0){
							res.json(data);
						}
					}
				});
	}
	
}

})();