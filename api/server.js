const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(
        `<h1>Welcome to Sam G's Node-DB1 Project</h1>
        <p>Please open insomnia or postman to interact!</p>
        `
    )
})

module.exports = server;
