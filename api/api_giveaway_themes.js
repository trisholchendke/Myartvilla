(function () {	'use strict';
var theme = require('../models/ModelGiveaway_themes.js');
var users = require('../models/ModelUsers.js');
var post_my_work = require('../models/ModelPost_my_work.js');
var comments = require('../models/comments.js');
var rating = require('../models/ModelRating.js');
var audience = require('../models/audience.js');

module.exports = function(app){
	
	app
	.post('/post_your_theme',post_your_theme)
	.post('/get_artist_themehistory_data',get_artist_themehistory_data)
	.post('/get_theme_detailss',get_theme_detailss)
	.post('/get_audience_quiz_details',get_audience_quiz_details)
	.post('/make_audience_winner',make_audience_winner)
	;
	function post_your_theme(req,res){
		console.log(req.body);
		var theme1 = new theme(req.body);
		theme1.save(function (err,data) {
			if (err) {
				res.json(err);
			} else {
				res.json(data);
//		    console.log(data);
			}
		});
	}
	
	function get_artist_themehistory_data(req,res){
		theme.find({user_id:req.body.user_id},function(err,doc){
			if(err){
				res.json(err);
			}else{
				res.json(doc);
			}
		});
	}
	function get_theme_detailss(req,res){
		theme.aggregate([
		                 {
		                	 $lookup:
		                	 {
		                		 from:"audiences",
		                		 localField:"theme_id",
		                		 foreignField:"theme_id",
		                		 as:"theme_audience"
		                	 }
		                 },
		                 {
		                	 $match:
		                	 {
		                		 "theme_id":req.body.theme_id
		                	 }
		                		 
		                 },
		                 ],function(err,doc){
			if(err){
				res.json(err);
			}else{
				console.log(doc);
				res.json(doc);
			}
		});
	}
	
	function get_audience_quiz_details(req,res){
		audience.aggregate([
		                    {
		                    	$lookup:
		                    	{
		                    		from:"answers",
		                    		localField:"audience_id",
		                    		foreignField:"user_id",
		                    		as:"audience_answers"
		                    	}
		                    },
		                    {
		                    	$match:
		                    	{
		                    		"audience_id":req.body.user_id
		                    	}
		                    },
		                    ],function(err,doc){
			if(err){
				res.json(err);
			}else{
				res.json(doc);
			}
		});
	}
	
	function make_audience_winner(req,res){
//		console.log(req.body);
		var myDateString = Date();
		audience.update({theme_id:req.body.theme_id},{$set:{"winner":0,"winner_on":myDateString}},{ multi: true },function(err,doc){
			if(err){
				res.json(err);
			}else{
				audience.update({audience_id:req.body.user_id},{$set:{"winner":1,"winner_on":myDateString}},function(err,doc1){
					if(err){
						res.json(err);
					}else{
						res.json(doc1);
					}
			})
				}
		});
	}
	
}

})();