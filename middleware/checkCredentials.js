const jwt = require('jsonwebtoken');

const checkCredentials = (req, res, next) => {
    const cookie = req.cookies.token;
    console.log(cookie);
    if(!cookie) return res.status(403).json({error: 'Cookie Not Present'})

    const currentDate = Date.now();
    const cookieExpDate = new Date(cookie.Expires).getTime();
    if (currentDate > cookieExpDate) return res.status(403).json({ error: 'Cookie Has Expired' });

    let bearerToken = cookie.token;
    if(!bearerToken) return res.status(403).json({ error: "Token Not Provided." });
    bearerToken = bearerToken.split(' ')
    const bearer = bearerToken[0];
    const token = bearerToken[1];

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
        res.status(400).json({ error: "Server Error" });
    }
}

module.exports = checkCredentials;