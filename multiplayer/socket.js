const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app)

const io = new Server(4000, {
    cors: {
        origin: [ "http://localhost:300"]
    }
});

io.on("connection", (socket) => {
    console.log("Connected");
    // join a room
    // creator of room can kick people out
    // don't remove player's score if they leave   
})