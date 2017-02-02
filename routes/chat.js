// // var express = require('express');
// // // var router = express.Router();
// // // var http = require('http').Server(express);
// // var app = express();
// // var server = app.listen();
// // var path = require('path');
// // var io = require('socket.io').listen(server);

// // app.get('/', function(req, res){
	


// // 	res.sendFile(path.join(__dirname, "../public", "index.html"));


// // 	io.on('connection', function(socket){
// // 		alert('dfr');
// // 		console.log('connected');
// // 		socket.on('disconnect', function(){
// // 			console.log('disconnected')
// // 		});
// // 	});
// // });

var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var express = require('express');
var app = express();
server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(path.join(__dirname,'../public','/index.html'));
});

io.on('connection', function (socket) {
	console.log('User a Connected');
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
		console.log('message: ' + msg);
	});
	// socket.on('disconnect', function(){
	// 	console.log('User a disconnected');
	// });
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
});

module.exports = app;


// // module.exports = app;
// var express = require('express');
// var app = express();
// var http = require( "http" ).createServer( app );
// var io = require( "socket.io" )( http );
// http.listen(8080, "127.0.0.1");

// app.get('/', function(req, res){

// res.sendFile(path.join(__dirname, "../public", "index.html"));

// io.on('connection',function(socket){  
//     console.log("A user is connected");
// 	});

// });

// module.exports = app;
