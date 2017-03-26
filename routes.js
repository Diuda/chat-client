var path = require('path');
module.exports = function(app) {

    var Chat = require('./database/chat.js');

    app.post('/login', function(req, res, next) {
        var chat = new Chat.ChatL({ 'uid': req.body.id });
        // details.chat.id = req.body.id;
        chat.save(function(err) {
            if (err)
                res.send(err);
            else
                res.send("data added");
        });
        next();

    });



    app.post('/room', function(req, res, next) {
        var room = new Chat.Room();

        // room.room_id = room.setRoomID(req.body.id, req.body.r_id);
        var s_id = req.body.id;
        var r_id = req.body.r_id;
        room.s_id = s_id;
        room.r_id = r_id;

        room.setRoomID(function(err, s_id, r_id, room_id) {
            if (err) throw err;

            console.log(s_id + " " + r_id + " " + room_id);

        });


        room.save(function(err) {
            if (err)
                res.send(err);
            else
                res.send("data Added");
        });
    });


    app.get('/chat', function(req, res) {
        res.sendfile(path.join(__dirname, '/public', '/index.html'));
    });

app.get('/log', function(req, res){
	
});

}
