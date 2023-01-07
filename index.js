const express = require('express');
const socket=require('socket.io');
//App setup
const app=express();
const port=process.env.PORT || 4000;

const server = app.listen(port, ()=>{console.log('listening on port '+port)});

//Static files
app.use(express.static('public'));

//Socket setup
const io=socket(server);

io.on('connection', (socket)=>{
    console.log('made socket connection', socket.id);
    socket.on('chat', (data)=>{
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data);
    });
});
