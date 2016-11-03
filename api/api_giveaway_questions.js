(function () {	'use strict';
var questions = require('../models/ModelGiveaway_question.js');
var answers = require('../models/ModelGiveaway_answer.js');
var theme = require('../models/ModelGiveaway_themes.js');
var audience = require('../models/audience.js');

module.exports = function(app){
//	console.log(questions);
	app
	.post('/post_give_away_questions',post_give_away_questions)
	.post('/get_question_of_giveaway',get_question_of_giveaway)
	.post('/post_give_away_answers',post_give_away_answers)
	.post('/register_audience',register_audience)
	.post('/get_theme_details',get_theme_details)
	
	;
	function post_give_away_questions(req,res){
		for(var i=0; i<req.body.questions.length;i++) {
			var test = req.body.questions[i];
			delete test.$$hashKey;
		}
//		console.log(req.body);
		var questions1 = new questions(req.body);
		questions1.save(function (err,data) {
			  if (err) {
			    res.json(err);
			  } else {
			    res.json(data);
			    console.log(data);
			  }
			});
	}
	function get_question_of_giveaway(req,res){
//		console.log(req.body);
		questions.find({"theme_id":req.body.theme_id},function (err,data) {
		  if (err) {
			    res.json(err);
			  } else {
			    res.json(data);
			  }
		});
	}
	function post_give_away_answers(req,res){
//		console.log(req.body);
		var answers1 = new answers(req.body);
		answers1.save(function (err,data) {
			  if (err) {
			    res.json(err);
			  } else {
			    res.json(data);
			    console.log(data);
			  }
		});
	}
	function register_audience(req,res){
		console.log(req.body.audience_data);
		var audience1 = new audience(req.body.audience_data);
		audience1.save(function(err,doc){
			if(err){
				res.json(err);
			}else{
				res.json(doc);
			}
		});
	}
	
	function get_theme_details(req,res){
		theme.find({theme_id:req.body.theme_id},function(err,doc){
			if(err){
				res.json(err);
			}else{
				res.json(doc);
			}
		})
	}
		
}

})();