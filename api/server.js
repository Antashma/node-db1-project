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

server.get('/api/accounts', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.status(200).json(accounts)
    } catch (err) {
        res.status(500).json({
            message: 'There was an error retrieving accounts data',
            error: err
        })
    }
})

server.get('/api/accounts/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const accountById = await db('accounts').where({id});
        res.status(200).json(accountById)
    } catch (err) {
        res.status(500).json({
            message: `There was an error retrieving data for account with id#${id}.`,
            error: err
        })
    }
})

server.post('/api/accounts/', async (req, res) => {
    const body = req.body;
    try {
        const newAccount = await db('accounts').insert(body);
        res.status(201).json(newAccount)
    } catch (err) {
        res.status(500).json({
            message: `There was an error adding that account.`,
            error: err
        })
    }
})

server.put('/api/accounts/:id', async (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    try {
        const updatedAccount = await db('accounts').update({...changes}).where({id});
        res.status(200).json(updatedAccount)
    } catch (err) {
        res.status(500).json({
            message: 
                `There was an error updating account with id#${id}.`,
            error: err
        })
    }
})

server.delete('/api/accounts/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const deletedAccount = await db('accounts').where({id}).del();
        res.status(200).json(deletedAccount)
    } catch (err) {
        res.status(500).json({
            message: 
                `There was an error deleting account with id#${id}.`,
            error: err
        })
    }
})

module.exports = server;
