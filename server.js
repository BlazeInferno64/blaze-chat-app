const express = require('express');
const path = require('path');

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

const port = 80;


app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});


io.on("connection", function(socket){
    socket.on("newuser",function(username){
        console.log(`${username} just connected to the chat room`);
        socket.broadcast.emit("update", username + ' has joined the conversation!')
    });
    socket.on("exituser",function(username){
        console.log(username);
        console.log(`${username} just disconnected from the chat room`);
        socket.broadcast.emit("update", username + ' has left the conversation!')
    });
    socket.on("chat",function(message){
        console.log(message);
        socket.broadcast.emit("chat", message);
    });
})


server.listen(port, () => {
	//console.log(`Server is listening at the https://localhost:${port}/`);
	console.log(`Server is listening at localhost:${port}`);
});