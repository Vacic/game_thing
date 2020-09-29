const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const joiValidate = require('../middleware/joiValidate');
const checkToken = require('../middleware/checkToken');
const userLoginSchema = require('../validationSchemas/userLoginSchema');

const User = require('../models/User');

// @route  POST /auth
// @desc   Login User
// @access Public
router.post('/login', joiValidate(userLoginSchema), async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).lean();
        if(!user) return res.status(400).json({ error: "Email Doesn't Exist"})
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({ error: "Invalid Password" });

        jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15 days' }, (err, token) => {
            if(err) throw err;
            res.cookie('token', `Bearer ${token}`, { maxAge: 1296000000, httpOnly: true, secure: true });
            res.status(200).end();
            // res.status(200).json({ token: `Bearer ${token}` });
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Server Error" });
    }
});

// @route GET auth/check-token
// @desc Checks the token and updates it if needed
// @access Private
router.get('/check-token', checkToken, async (req, res) => {
    const id = req.token.id;
    const exp = req.token.exp;
    const currentDate = Date.now()/1000;
    try {
        if(exp - currentDate < 864000) { // If less than 10 days remain before the token expires create a new one - refreshes every fifth day
            jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15days' }, (err, token) => {
                if(err) throw err;
                res.cookie('token', `Bearer ${token}`, { maxAge: 1296000000, httpOnly: true, secure: true });
                res.status(200).end();
                // res.status(200).json(`Bearer ${token}`);
            });
        } else {
            res.status(200).end();
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Server Error" });
    }
})

module.exports = router;