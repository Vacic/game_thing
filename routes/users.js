const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const checkToken = require('../middleware/checkToken');
const joiValidate = require('../middleware/joiValidate');
const userRegistrationSchema = require('../validationSchemas/userRegistrationSchema');
const userUpdateSchema = require('../validationSchemas/userUpdateSchema');

const User = require('../models/User');
const UserProgress = require('../models/UserProgress');

// @route POST /users/register
// @desc User Registration
// @access Public
router.post('/register', joiValidate(userRegistrationSchema), async (req, res) => {
    const { username, email, password, playerStats, inventory, equipment, quickBarEquipment, currentHp, currentLocation } = req.body;

    if(await User.findOne({ email })) return res.status(400).json({ error: 'Email Already Exists' });

    const userFields = { username, email, password };
    const progressFields = {}
    if(playerStats) progressFields.playerStats = playerStats;
    if(inventory) progressFields.inventory = inventory;
    if(equipment) progressFields.equipment = equipment;
    if(quickBarEquipment) progressFields.quickBarEquipment = quickBarEquipment;
    if(currentHp) progressFields.currentHp = currentHp;
    if(currentLocation) progressFields.currentLocation = currentLocation;

    try {
        const user = new User(userFields);
        const progress = new UserProgress(progressFields);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        const newUser = await user.save();
        progress.user = newUser._id;
        await progress.save();
        res.status(200).end();
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route GET users/user
// @desc GET current user info
// @access Private
router.get('/user', checkToken, async (req, res) => {
    const id = req.token.id;
    try { 
        const user = await User.findOne({ _id: id }).select('-password -_id -__v').lean();
        if(!user) return res.status(400).json({ error: "User Doesn't Exist" })
        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route PUT /users/update-user
// @desc Update User Information
// @access Private
router.put('/update-user', [joiValidate(userUpdateSchema), checkToken], async (req, res) => {
    const { username, email, password } = req.body;
    id = req.token.id;

    if(await User.findOne({ email })) return res.status(400).json({ error: 'Email Already Exists' });
    const userFields = {};
    if(username) userFields.username = username;
    if(email) userFields.email = email;
    if(password) userFields.password = password;
    try {
        if(userFields.password) {
            const salt = await bcrypt.genSalt(10);
            userFields.password = await bcrypt.hash(password, salt);
        }
        const updatedUser = await User.findOneAndUpdate({'_id': id}, { $set: userFields }, { new: true }).select('-_id -password -__v').lean();
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route GET /users/progress
// @desc Get User Progress
// @access Private
router.get('/progress', checkToken, async (req, res) => {
    const id = req.token.id;
    try {
        const userProgress = await UserProgress.findOne({ user: id }).lean();
        res.status(200).json(userProgress);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route PUT /users/progress
// @desc Update User Progress
// @access Private
router.put('/progress', checkToken, async (req, res) => {
    const progress = req.body;
    const id = req.token.id;
    try {
        const userProgress = await UserProgress.findOneAndUpdate({'user': id}, { $set: progress })
        res.status(200).end();
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route DELETE /users/remove-user
// @desc Delete Entire User With Progress
// @access Private
router.delete('/remove-user', checkToken, async (req, res) => {
    const id = req.token.id;
    try {
        await User.deleteOne({'_id': id})
        await UserProgress.deleteOne({'user': id})
        res.status(200).end();
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;