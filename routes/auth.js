const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const joiValidate = require('../middleware/joiValidate');
const checkCredentials = require('../middleware/checkCredentials');
const userLoginSchema = require('../validationSchemas/userLoginSchema');

const User = require('../models/User');

// @route  Post auth
// @desc   Login User
// @access Public
router.post('/', joiValidate(userLoginSchema), async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).lean();
        if(!user) return res.status(400).json({ error: "Email Doesn't Exist"})
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({ error: "Invalid Password" });

        jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15 days' }, (err, token) => {
            if(err) throw err;
            res.cookie('token', `Bearer ${token}`, { maxAge: 10, httpOnly: true, secure: true });
            res.status(200).end();
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Server Error" });
    }
});

router.get('/checkcookie', checkCredentials, async (req, res) => {
    const exp = req.token.exp;
    const id = req.token.id;
    try {
        if(exp - Date.now()/1000 < 864000) { // If less than 10 days remain before the token expires create a new one - refreshes every fifth day
            jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15 days' }, (err, token) => {
                if(err) throw err;
                res.cookie('token', `Bearer ${token}`, { maxAge: 1296000, httpOnly: true, secure: true });
                res.status(200).end();
            });
        } else {
            console.log('Cookie Still Valid');
            res.status(200).end();
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Server Error" });
    }
})

module.exports = router;