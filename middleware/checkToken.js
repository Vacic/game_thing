const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const cookieToken = req.cookies;
    console.log(cookieToken)
    if(!cookieToken) return res.status(400).json({error: 'Cookie Not Present'})
    let bearerToken = cookieToken.token;
    console.log(bearerToken)
    if(!bearerToken) return res.status(400).json({ error: "Token Not Provided." });
    bearerToken = bearerToken.split('%20')
    const bearer = bearerToken[0];
    const token = bearerToken[1];
    console.log(bearer)
    console.log(token)

    if(bearer !== 'Bearer') return res.status(403).json({ error: "Unauthorized Request" });
    if(!token) return res.status(403).json({ error: "Unauthorized Request" });

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decodedToken.id;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Server Error" });
    }
}

module.exports = checkToken;