const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const cookie = req.cookies;
    if(!cookie) return res.status(400).json({error: 'Cookie Not Present'})
    let bearerToken = cookie.token;
    if(!bearerToken) return res.status(400).json({ error: "Token Not Provided." });
    bearerToken = bearerToken.split(' ')
    const bearer = bearerToken[0];
    const token = bearerToken[1];

    if(bearer !== 'Bearer') return res.status(403).json({ error: "Unauthorized Request" });
    if(!token) return res.status(403).json({ error: "Unauthorized Request" });

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(decodedToken.exp - Date.now()/1000 < 172800) { // If less than 2 days remain before the token expires create a new one
            jwt.sign({ id: decodedToken.id }, process.env.JWT_SECRET, { expiresIn: 172815 }, (err, token) => {
                if(err) throw err;
                console.log(token)
                res.cookie('token', `Bearer ${token}`, { maxAge: 1296000, httpOnly: true, secure: true });
            });
        } else {
            console.log('more than 2 days remain')
        }
        req.id = decodedToken.id;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Server Error" });
    }
}

module.exports = checkToken;