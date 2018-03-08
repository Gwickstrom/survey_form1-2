  //load the express module
//load the path module
//load the body-parser
var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
// invoke var express and store the resulting application in var app
var app = express();
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var route = require('./routes/index.js')(app);
//setting server to run on port 8000
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
// this is a new line we're adding AFTER our server listener
// take special note how we're passing the server
// variable. unless we have the server variable, this line will not work!!
var io = require('socket.io').listen(server);
// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function(socket){
    console.log("WE ARE USING SOCKETS!");
    console.log(socket.id);
    //all the socket code goes in here!
    socket.on("button_clicked", function (data){
    console.log('Someone clicked a button!  Reason: ' + data.reason);
    socket.emit('server_response', {response: "sockets are the best!"});

    //Note the 3 types of emits below do not have listeners
    socket.emit('my_emit_event');
    //  BROADCAST:
    socket.broadcast.emit("my_broadcast_event");
    //  FULL BROADCAST:
    io.emit("my_full_broadcast_event");
})
})
