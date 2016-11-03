(function () {	'use strict';
var users = require('../models/ModelUsers.js');

module.exports = function(app){

	
	app
	.post('/get_all_users',get_all_users)
	;
		
	function get_all_users(req,res){
		users.find(function (err,data) {
		  if (err) {
		    res.json(err);
		  } else {
		    res.json(data)
		  }
	});
	}
	
}

})();