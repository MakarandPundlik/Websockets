//making connection
const socket = io.connect('http://localhost:2410');

//dom querying
const message = document.getElementById('message'),
handle = document.getElementById('handle'),
btn = document.getElementById('send'),
output = document.getElementById('output'),
feedback = document.getElementById('feedback');

//emiting to the server
btn.addEventListener('click',()=>{
    socket.emit('chat',{
        handle:handle.value,
        message:message.value
    });
});

feedback.addEventListener('keypress',()=>{
    socket.emit('typing',handle.value);
});

//listening to the server
socket.on('chat',(data)=>{
    feedback.innerHTML += ''
    output.innerHTML += '<p><strong>'+ data.handle + ':</strong><br/>' + data.message + '</p>';
});

socket.on('typing',(data)=>{
    feedback.innerHTML += '<p><em>' + data + ' is typing' + '</em></p>';
})