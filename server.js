const exp = require('constants');
var express = require('express');
var app = express();
const port = process.env.PORT || 3000;
var server = app.listen(port);
var socket = require('socket.io');
var io = socket(server);
app.use(express.static('public'));
io.sockets.on('connection', newConnection);



function newConnection(socket)
{
    console.log('new connection: ' + socket.id);
    
    socket.on('mouse', mouseMsg);

    function mouseMsg(data) 
    {
        socket.broadcast.emit('mouse', data);
    }


    socket.on('clear', clearMsg);

    function clearMsg() {
        socket.broadcast.emit('clear');
    }
}
