var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    uid: { type: String, unique: true }
});

var roomSchema = new mongoose.Schema({
    s_id: { type: String },
    r_id: { type: String },
    room_id: { type: String, unique: true }
});


roomSchema.methods.setRoomID = function() {
    this.room_id = this.s_id + this.r_id + 'r';
    return roomSchema.room_id;
};

var messageSchema = new mongoose.Schema({
    s_id: { type: String },
    r_id: { type: String },
    room_id: { type: String },
    message_id: { type: String, unique: true},
    created_date: { type: Date, default: Date.now() },
    message_content: { type: String }
});



var ChatL = mongoose.model('ChatL', chatSchema);
var Room = mongoose.model('Room', roomSchema);
var Message = mongoose.model('Message', messageSchema);


module.exports = {
	ChatL:ChatL,
	Room: Room,
	Message: Message
};






