const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const joiValidate = require('../middleware/joiValidate');
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

        jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn:'15 days' }, (err, token) => {
            if(err) throw err;
            //res.json({token});
            //COOKIE LOGIC - CAN'T TEST WITH THIS IN DEVELOPMENT
            cookie = req.cookie && req.cookie.token
            if (!cookie) {
                res.cookie('token', `Bearer ${token}`, { maxAge: 1296000, httpOnly: true, secure: true });
                res.status(200).end();
            } else {
                console.log('cookie exists', cookie);
                res.status(200).end();
            } 
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Server Error" });
    }
});

module.exports = router;