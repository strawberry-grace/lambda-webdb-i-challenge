const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({ message: 'error retrieving posts', error: err });
    }
});

server.get('/:id', async (req, res) => {
    try {
        const account = await db('accounts').where({ id });
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: `could not find account #${id}` });
        }
    } catch (err) {
        res.status(500).json({ message: 'server error, sorry', error: err });
    }
});

server.post('/', async (req, res) => {
    const accountData = req.body;
    try {
        const newAccount = await db('accounts').insert(accountData);
        res.status(201).json(newAccount);
    } catch (err) {
        res.status(500).json({ message: 'could not add the account', error: err });
    }
});

server.put('/:id', async (req, res) => {
    const { id } = req.params;
    const accountUpdates = req.body;
    
    try {
        const count = await db('accounts').where('id', '=', id).update(accountUpdates);
        if (count) {
            res.status(200).json({ updated: count });
        } else {
            res.status(404).json({ message: `could not find account #${id}` });
        }
    } catch (err) {
        res.status(500).json({ message: 'could not update the account due to a server error', error: err });
    }
});

server.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const count = await db('accounts').where({ id }).del();
        if (count) {
            res.status(200).json({ deleted: count });
        } else {
            res.status(404).json({ message: `could not find account #${id}` });
        }
    } catch (err) {
        res.status(500).json({ message: 'could not delete the account due to a server error', error: err });
    }
});

module.exports = server;