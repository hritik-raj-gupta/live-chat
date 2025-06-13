// const socket = io('http://localhost:8000');
const socket = io('https://live-chat-nhke.onrender.com');

const form =document.getElementById('send-container');
const messageInput =document.getElementById('messageInp');
const messageContainer =document.querySelector(".container");

const append = (message, position) => {
    console.log("here", message);
    const messageElement = document.createElement('div');
    messageElement.innerText = message; // Use innerText instead of innertext
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
};

/// form.submit here addind event listner

form.addEventListener('submit',(e)=>{
    e.preventDefault();  // page doesn't reload
    const message =messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value =''
})

const namee =prompt("Enter your name to join ");
socket.emit('new-user-joined',namee);

socket.on('user-joined',name=>{
    console.log(name)
    append(`${name} :joined the chat`,'right')
})

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')
})

socket.on('left',name=>{
    append(`${name} : leave the chat`,'left')
})
