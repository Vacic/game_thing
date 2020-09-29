const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    let cookieToken = req.cookies.token;
    if(!cookieToken) return res.status(403).json({error: 'Token Not Provided'});

    cookieToken = cookieToken.split(' ');
    const bearer = cookieToken[0];
    const token = cookieToken[1];

    if(bearer !== 'Bearer') return res.status(403).json({ error: "Unauthorized Request" });
    if(!token) return res.status(403).json({ error: "Unauthorized Request" });

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.token = {};
        req.token.id = decodedToken.id;
        req.token.exp = decodedToken.exp;
        next();
    } catch (err) {
        console.log(err);
        if(err.message === 'jwt expired') return res.status(403).json({ error: 'Token Expired' });
        res.status(400).json({ error: "Server Error" });
    }
}

module.exports = checkToken;