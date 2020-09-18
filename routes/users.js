const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const checkToken = require('../middleware/checkToken');
const joiValidate = require('../middleware/joiValidate');
const userRegistrationSchema = require('../validationSchemas/userRegistrationSchema');

const User = require('../models/User');
const UserProgress = require('../models/UserProgress');

// @route POST /users
// @desc User Registration
// @access Public
router.post('/', joiValidate(userRegistrationSchema), async (req, res) => {
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
        //res.status(200).end();
        res.json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route GET /users/progress/:id
// @desc Get User Progress
// @access Private
router.get('/progress', checkToken, async (req, res) => {
    const id = req.id;
    try {
        const userProgress = await UserProgress.findOne({ user: id }).populate('user', 'username').lean();
        res.json(userProgress);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

// @route PUT /users
// @desc Update User Information
// @access Private
router.put('/progress', checkToken, async (req, res) => {
    const progress = req.body;
    const id = req.id;
    try {
        const userProgress = await UserProgress.findOneAndUpdate({'user': id}, { $set: progress })
        res.json(userProgress);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

router.get('/randtoken', (req, res) => {
    require('crypto').randomBytes(256, function(err, buf) {
        const token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
        res.send(token);
    });
})

module.exports = router;