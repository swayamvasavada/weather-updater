const express = require('express');
const router = express.Router();

const User = require('../models/manage-subscription');

router.get('/user-accounts', async function (req, res) {
    const result = await User.fetch();

    res.json(result);
});

router.post('/block-user/:id', async function (req, res) {
    const userId = req.params.id;
    const user = new User(userId);

    const result = await user.block();

    res.json(result);
});

router.post('/unblock-user/:id', async function (req, res) {
    const userId = req.params.id;
    const user = new User(userId);

    const result = await user.unblock();

    res.json(result);
});

router.post('/delete-user/:id', async function (req, res) {
    const userId = req.params.id;
    const user = new User(userId);

    const result = await user.delete();

    res.json(result);
});

module.exports = router;