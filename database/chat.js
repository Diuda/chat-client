var mongoose = require('mongoose');


var chatSchema = new mongoose.Schema({
	id: {type:Number, unique:true}
	create: {type:Date, default:Date.now},
	content: {type:String},
	username: {type:String},
	room: {type:String}
});

var chat = mongoose.model('Chat', ChatSchema);