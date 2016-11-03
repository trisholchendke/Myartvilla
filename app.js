

//RESTfull API

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var methodOverride = require('method-override');
var _ = require('lodash');


// Create the application.
 var app = require('http').createServer(handler)
, io = require('socket.io').listen(app)
, fs = require('fs')
, exec = require('child_process').exec
, util = require('util')
,express = require('express')
, Files = {};
 

 
 app.listen(8989);

 var app = express().use(express.static(__dirname + '/public'));
app.use('/img',express.static(__dirname +'public/view'));

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));


// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MyArtVilla');

mongoose.connection.once('open', function(err,db) {
  app.models = require('./models/index');
  
  require('./api/api_user.js')(app);
  require('./api/api_artist_users.js')(app);
  require('./api/api_writer_users.js')(app);
  require('./api/api_fashion_users.js')(app);
  require('./api/api_editor_users.js')(app);
  require('./api/api_publisher_users.js')(app);
  require('./api/api_layoutdesigner_users.js')(app);
  require('./api/api_coverdesigner_users.js')(app);
  require('./api/api_admin_dashboard.js')(app);
  require('./api/api_index.js')(app);
  require('./api/api_giveaway_questions.js')(app);
  require('./api/api_giveaway_themes.js')(app);
  require('./api/api_short_films_users.js')(app);
  
  
  console.log('Listening on port 8080...');
  app.listen(8080);

});
function handler (req, res) {
	  fs.readFile(__dirname + '/public/index.html',
	  function (err, data) {
	    if (err) {
	      res.writeHead(500);
	      return res.end('Error loading index.html');
	    }
	    res.writeHead(200);
	    res.end(data);
	  });
	}

	io.sockets.on('connection', function (socket) {
	  	socket.on('Start', function (data) { //data contains the variables that we passed through in the html file
				var Name = data['Name'];
				console.log(Name);
				Files[Name] = {  //Create a new Entry in The Files Variable
					FileSize : data['Size'],
					Data	 : "",
					Downloaded : 0
				}
				var Place = 0;
				try{
					var Stat = fs.statSync('Temp/' +  Name);
					if(Stat.isFile())
					{
						Files[Name]['Downloaded'] = Stat.size;
						Place = Stat.size / 524288;
					}
				}
		  		catch(er){} //It's a New File
				fs.open("Temp/" + Name, 'a', 0755, function(err, fd){
					if(err)
					{
						console.log(err);
					}
					else
					{
						Files[Name]['Handler'] = fd; //We store the file handler so we can write to it later
						socket.emit('MoreData', { 'Place' : Place, Percent : 0 });
					}
				});
		});
		
		socket.on('Upload', function (data){
				var Name = data['Name'];
				Files[Name]['Downloaded'] += data['Data'].length;
				Files[Name]['Data'] += data['Data'];
				if(Files[Name]['Downloaded'] == Files[Name]['FileSize']) //If File is Fully Uploaded
				{
					fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
                        var path=(new Date()).toISOString().replace(/[^0-9]/g, "").concat('.',Name.split('.').pop());
						var readStream = fs.createReadStream("Temp/" + Name);
						var writeStream = fs.createWriteStream("public/assets/upload/" +path);

                        readStream.on("end",function() {

									fs.unlink("Temp/" + Name, function () { //This Deletes The Temporary File
										exec("ffmpeg -i public/assets/upload/" + path  + " -ss 01:30 -r 1 -an -vframes 1 -f mjpeg public/assets/upload/" + path, function(err){
											socket.emit('Done', {'Image' : 'public/assets/upload/' + path});
										});
									});
									fs.close(Files[Name]['Handler'], function(err){
								         if (err){
								            console.log(err);
								         } 
								         console.log("File closed successfully.");
								      });
							});
					

						readStream.pipe(writeStream);
						

					});
				}
				else if(Files[Name]['Data'].length > 10485760){ //If the Data Buffer reaches 10MB
					fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
						Files[Name]['Data'] = ""; //Reset The Buffer
						var Place = Files[Name]['Downloaded'] / 524288;
						var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
						socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
					});
				}
				else
				{
					var Place = Files[Name]['Downloaded'] / 524288;
					var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
					socket.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
				}
			});
		
	});
	io.sockets.on('connection', function (socket) {
		socket.on('StartDoc', function (data) { //data contains the variables that we passed through in the html file
			var Name = data['Name'];
			Files[Name] = {  //Create a new Entry in The Files Variable
				FileSize : data['Size'],
				Data	 : "",
				Downloaded : 0
			}
			var Place = 0;
			try{
				var Stat = fs.statSync('Temp/' +  Name);
				if(Stat.isFile())
				{
					Files[Name]['Downloaded'] = Stat.size;
					Place = Stat.size / 524288;
				}
			}
	  		catch(er){} //It's a New File
			fs.open("Temp/" + Name, 'a', 0755, function(err, fd){
				if(err)
				{
					console.log(err);
				}
				else
				{
					Files[Name]['Handler'] = fd; //We store the file handler so we can write to it later
					socket.emit('MoreDataDoc', { 'Place' : Place, Percent : 0 });
				}
			});
	});
		
		socket.on('UploadDoc', function (data){
			var Name = data['Name'];
			Files[Name]['Downloaded'] += data['Data'].length;
			Files[Name]['Data'] += data['Data'];
			if(Files[Name]['Downloaded'] == Files[Name]['FileSize']) //If File is Fully Uploaded
			{
				fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
					
                    var path=(new Date()).toISOString().replace(/[^0-9]/g, "").concat('.',Name.split('.').pop());
					var readStream = fs.createReadStream("Temp/" + Name);
					var writeStream = fs.createWriteStream("public/assets/document/" +path);

                    readStream.on("end",function() {

								fs.unlink("Temp/" + Name, function () { //This Deletes The Temporary File
									exec("ffmpeg -i public/assets/document/" + path  + " -ss 01:30 -r 1 -an -vframes 1 -f mjpeg public/assets/document/" + path, function(err){
										socket.emit('DoneDoc', {'Image' : 'public/assets/document/' + path});
									});
								});
						});
				

					readStream.pipe(writeStream);
					
				});
			}
			else if(Files[Name]['Data'].length > 10485760){ //If the Data Buffer reaches 10MB
				fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
					Files[Name]['Data'] = ""; //Reset The Buffer
					var Place = Files[Name]['Downloaded'] / 524288;
					var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
					socket.emit('MoreDataDoc', { 'Place' : Place, 'Percent' :  Percent});
				});
			}
			else
			{
				var Place = Files[Name]['Downloaded'] / 524288;
				var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
				socket.emit('MoreDataDoc', { 'Place' : Place, 'Percent' :  Percent});
			}
		});
	});
	
	io.sockets.on('connection', function (socket) {
		socket.on('StartDoc', function (data) { //data contains the variables that we passed through in the html file
			var Name = data['Name'];
			Files[Name] = {  //Create a new Entry in The Files Variable
				FileSize : data['Size'],
				Data	 : "",
				Downloaded : 0
			}
			var Place = 0;
			try{
				var Stat = fs.statSync('Temp/' +  Name);
				if(Stat.isFile())
				{
					Files[Name]['Downloaded'] = Stat.size;
					Place = Stat.size / 524288;
				}
			}
	  		catch(er){} //It's a New File
			fs.open("Temp/" + Name, 'a', 0755, function(err, fd){
				if(err)
				{
					console.log(err);
				}
				else
				{
					Files[Name]['Handler'] = fd; //We store the file handler so we can write to it later
					socket.emit('MoreDataDoc', { 'Place' : Place, Percent : 0 });
				}
			});
	});
		
		socket.on('UploadDoc', function (data){
			var Name = data['Name'];
			Files[Name]['Downloaded'] += data['Data'].length;
			Files[Name]['Data'] += data['Data'];
			if(Files[Name]['Downloaded'] == Files[Name]['FileSize']) //If File is Fully Uploaded
			{
				fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
					
                    var path=(new Date()).toISOString().replace(/[^0-9]/g, "").concat('.',Name.split('.').pop());
					var readStream = fs.createReadStream("Temp/" + Name);
					var writeStream = fs.createWriteStream("public/assets/document/" +path);

                    readStream.on("end",function() {

								fs.unlink("Temp/" + Name, function () { //This Deletes The Temporary File
									exec("ffmpeg -i public/assets/document/" + path  + " -ss 01:30 -r 1 -an -vframes 1 -f mjpeg public/assets/document/" + path, function(err){
										socket.emit('DoneDoc', {'Image' : 'public/assets/document/' + path});
									});
								});
						});
					readStream.pipe(writeStream);
				});
			}
			else if(Files[Name]['Data'].length > 10485760){ //If the Data Buffer reaches 10MB
//				console.log(Files[Name]['Data'].length);
				fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
					Files[Name]['Data'] = ""; //Reset The Buffer
					var Place = Files[Name]['Downloaded'] / 524288;
					var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
					socket.emit('MoreDataDoc', { 'Place' : Place, 'Percent' :  Percent});
				});
			}
			else
			{
				var Place = Files[Name]['Downloaded'] / 524288;
				var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
				socket.emit('MoreDataDoc', { 'Place' : Place, 'Percent' :  Percent});
			}
		});
	});

	var usernames = {};
	var rooms = [];

	io.sockets.on('connection', function (socket) {
	    
	    socket.on('adduser', function (data) {
	        var username = data.username;
	        var room = data.room;

	        if (rooms.indexOf(room) != -1) {
	            socket.username = username;
	            socket.room = room;
	            usernames[username] = username;
	            socket.join(room);
	            socket.emit('updatechat', 'SERVER', 'You are connected. Start chatting');
	            socket.broadcast.to(room).emit('updatechat', 'SERVER', username + ' has connected to this room');
	        } else {
	            socket.emit('updatechat', 'SERVER', 'Please enter valid code.');
	        }
	    });
	    
	    socket.on('createroom', function (data) {
	        var new_room = ("" + Math.random()).substring(2, 7);
	        rooms.push(new_room);
	        data.room = new_room;
	        socket.emit('updatechat', 'SERVER', 'Your room is ready, invite someone using this ID:' + new_room);
	        socket.emit('roomcreated', data);
	    });

	    socket.on('sendchat', function (data) {
	        io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	    });

	    socket.on('disconnect', function () {
	        delete usernames[socket.username];
	        io.sockets.emit('updateusers', usernames);
	        if (socket.username !== undefined) {
	            socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
	            socket.leave(socket.room);
	        }
	    });
	});


