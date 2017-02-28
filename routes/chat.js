

var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var express = require('express');
var app = express();
server.listen(4000);
// var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27071/chat', function(err){
// 	if(err){
// 		console.log(err);
// 	}
// 		else{
// 			console.log("Connected");
// 		}
// });

// var chatSchema = mongoose.Schema({
// 	id: {type:String, unique:true},
// 	senderName: {type:String},
// 	recieverName: {type:String},
// 	createAt: {type:Date, Default: Date.now}	
// });

// var chat = mongoose.model('chat', chatSchema);

app.get('/', function (req, res) {
  res.sendfile(path.join(__dirname,'../public','/index.html'));
});
 
var clients = 0;
var usernames = {};

io.on('connection', function (socket) {
	clients++;


	console.log('User Connected');

	socket.on('new user', function(data, callback){
		if(data in usernames){
			callback(false)
		}
		else{
		callback(true);
		socket.username = data;
		usernames[socket.username] = socket;
		// usernames.push(socket.username);
		io.sockets.emit('username', Object.keys(usernames));
	}
	});
	
	socket.on('chat message', function(data){
		io.emit('message', {msg:data, user:socket.username});
		console.log('message: ' + data);
	});
	socket.on('disconnect', function(){
		// console.log('User disconnected');
		if(!socket.username)
			return;
		delete usernames[socket.username];
		// usernames.splice(usernames.indexOf(socket.username), 1);
		// clients--;
		io.sockets.emit('username', usernames);
	});

});

module.exports = app;

