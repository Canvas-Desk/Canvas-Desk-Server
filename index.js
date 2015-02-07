var io = require('socket.io')(8080);
var app = require('express')();

var http = require('http').Server(app);

io.on('connection', function(socket) {
    console.log("connected");

    socket.on("disconnect", function() {
        console.log("disconnect");
    });
});

console.log("Started");


http.listen(3000, function() {
    console.log('listening on *:3000');
});
