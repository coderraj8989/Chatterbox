//Make connection
const socket=io.connect('https://chatterbox-ritikraj.netlify.app/')

//Query DOM

const message=document.getElementById('message');
const handle=document.getElementById('handle');
const btn=document.getElementById('send');
const output=document.getElementById('output');
const feedback=document.getElementById('feedback');
const chatWindow=document.getElementById('chat-window');

//Emit Events
btn.addEventListener('click', ()=>{
    if(handle.value && message.value)
    {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value 
        });
        message.value="";
    }
    else if(!handle.value)
    {
        alert('Please type a valid handle.');
    }
    else if(!message.value)
    {
        alert('Please type a message first');
    }
    chatWindow.scrollTop=chatWindow.scrollHeight;
});

message.addEventListener('keypress', ()=>{
    socket.emit('typing', handle.value)
})

//Listen for events
socket.on('chat', (data)=>{
    feedback.innerHTML="";
    output.innerHTML += '<p class="p-1" ><strong>'+data.handle+': </strong>'+data.message+'</p>';
    chatWindow.scrollTop=chatWindow.scrollHeight;
});

socket.on('typing', (data)=>{
    feedback.innerHTML='<p><em>'+data+' is typing a message....</em></p>';
})
