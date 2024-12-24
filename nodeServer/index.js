// Node server which will handle socket io connections
const io = require('socket.io')(8000, {
    cors: {
        origin: "*", // Allow all origins
    }
});

const users ={};
io.on('connection',socket=>{     /// listening incoming events  // io.on it is socket.io insanace , it listen veriouse socket connection (rohon ,riya hritk)
    socket.on('new-user-joined',name =>{ 
        console.log("New-user",name)       
        
    users[socket.id] =name ;  // it handle connection
    socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message, name:users[socket.id]})
    });

    socket.on('disconnect',message =>{
        console.log("left")
        socket.broadcast.emit('left',users[socket.io]);
        delete users[socket.id];
    });
})