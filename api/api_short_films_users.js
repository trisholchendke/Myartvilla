(function () {	'use strict';
var users = require('../models/ModelUsers.js');
var post_my_work = require('../models/ModelPost_my_work.js');
var comments = require('../models/comments.js');

module.exports = function(app){
	app
	.post('/get_short_films_user_work_history',get_short_films_user_work_history)
	;
	function get_short_films_user_work_history(req,res){
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
//							console.log(data);
						}
					}
				});
	}
	

}

})();