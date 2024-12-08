const jwt = require('jsonwebtoken')

const checkUser = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            jwt.verify(token, 'secret', (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'Invalid token' });
                }

                req.user = decoded;
                next();
            });
        } else {
            return res.status(401).json({ message: 'No token provided' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error on server' });
    }
}

module.exports = { checkUser };