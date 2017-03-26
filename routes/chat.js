var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var express = require('express');
var app = express();
server.listen(4000);
var mongoose = require('mongoose');
var uuid = require('node-uuid');

mongoose.connect('mongodb://localhost:27017/test');

var Chat = require('../database/chat.js');



var clients = 0;
var sender;
var rec;
var roomName;

function getRoomName(user, reciever, callback){
	       Chat.Room.findOne({ s_id: user, r_id: reciever }, function(err, room){
	       	if(room!=null){
	       		// sender = user;
        	roomName = room.room_id;
        	console.log(roomName);
            return callback(roomName);
        }
        else{
        	Chat.Room.findOne({s_id: reciever, r_id: user}, function(err, room){
        		if(room!=null){
        			// sender = user;
        			roomName = room.room_id;
        			console.log(roomName);
                    return callback(roomName);
        			}
        		});
        	}
        });
}

io.on('connection', function(socket) {



    console.log('User Connected');

    socket.on('new user', function(user, reciever, callback) {
        // if(data in usernames){
        // 	callback(false)
        // }
        
        callback(true);


 		getRoomName(user, reciever, function(roomN){

        console.log(roomN);
        socket.username = user
        socket.join(roomN);

          io.sockets.emit('username', socket.username);

        });
 		// sender = user;


        // console.log(user + ' ' + reciever);
        // // else{
        
        // socket.username = user;
        // // usernames[socket.username] = socket;
        // usernames.push(socket.username);
      



    });
    // console.log(socket.id);

    var message = new Chat.Message();

    socket.on('chat message', function(data) {
    	// console.log(roomName);
    	// console.log(data+" "+socket.username);

        message.find({room_id: roomName}, function(err, data){
            console.log("sender: "+s_id+" reciever: "+r_id+" message: "+message_content+" time: "+create_date);
        });
        io.in(roomName).emit('message', { msg: data, user: socket.username });
        // console.log(io.sockets.manager);
        // console.log(io.sockets.manager.roomClients[socket.id]);
        
        message.s_id = socket.username;
        message.room_id = roomName;
        message.message_id = uuid.v4();
        message.message_content = data;

        message.save(function(err){
            if (err)
                // res.send(err);
            console.log(err);
            else
                console.log("data added");
        });



    });



    socket.on('disconnect', function() {
        console.log('User disconnected');				
        //     return;
        // // delete usernames[socket.username];
        // // usernames.splice(usernames.indexOf(socket.username), 1);
        // // clients--;
        // io.sockets.emit('username', usernames);
    });

});

module.exports = app;
