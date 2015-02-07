var io = require('socket.io')(8080);
var app = require('express')();

var http = require('http').Server(app);

var settings = {
    brushSize: 5.01,
    color: [185.0, 55.0, 100.0],
    colorChoose: {
        primary: "#111",
        secondary: "#222"
    },
    currentLayer: "_id",
    layers: {
        //list
    },
    currentTool: "brush"
}



app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log("connected");

    io.on("changeBrushSize", function(newSize) {
        settings.brushSize = newSize;
        io.emit("updateBrushSize", settings.brushSize)
    });

    io.on("changeTool", function(newTool){
    	settings.currentTool = newTool;
    	io.emit("updateTool", settings.currentTool)
    });    

    socket.on("disconnect", function() {
        console.log("disconnect");
    });
});

console.log("Socket.io listening on *:8080");


http.listen(3000, function() {
    console.log('Express listening on *:3000');
});
