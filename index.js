const express = require('express');
const socket = require('socket.io');

const app = express();

const port = 2410 || process.env.port;

const server = app.listen(port,()=>console.log(`listening to the requests from port ${port}`));

//static folder middleware
app.use(express.static('public'));

//setting up socket
const io = socket(server);

io.on('connection',(socket)=>{
    console.log(`connection was made`,socket.id);

   // Handle chat event
   socket.on('chat', (data)=>{
    // console.log(data);
    io.sockets.emit('chat', data);
});

//handle the typing event
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data);
    })
});