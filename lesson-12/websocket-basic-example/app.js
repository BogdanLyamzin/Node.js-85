import {WebSocketServer} from "ws";

const wsServer = new WebSocketServer({port: 5000});

const socketList = [];

wsServer.on("connection", (socket)=> {
    // console.log("New frontend connected");
    socketList.push(socket);

    socket.send("Welcome to web-socket server");

    socketList.forEach(item => {
        if(item !== socket) {
            item.send(`Now we have ${socketList.length} members`);
        }
    })

    socket.on("close", ()=> {
        console.log("Close connection")
        const index = socketList.findIndex(item => item === socket);
        socketList.splice(index, 1);
    })
})