// Express + HTTP server setup
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = require('socket.io')(server, {
    cors: {
        origin: "*", // Allow all origins for development; restrict in production
    }
});

const users = {};

// Health check route (optional but useful for testing Render)
app.get('/', (req, res) => {
    res.send('Socket.IO server is running');
});

// Socket.IO event handling
io.on('connection', socket => {
    console.log('A user connected:', socket.id);

    socket.on('new-user-joined', name => {
        console.log('New user joined:', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message,
            name: users[socket.id]
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', users[socket.id]);
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});

// Use Render's dynamic port or fallback to 8000
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
