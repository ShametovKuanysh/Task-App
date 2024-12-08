const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models')

const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const user = await User.findOne({ where: { email: email}});

        if (user){
            return res.status(400).json({ message: 'User with this email already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            email,
        });

        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ where: { username }});

        if (!user){
            return res.status(400).json({ message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            return res.status(400).json({ message: 'Invalid password' })
        }

        const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });

        res.json({ message: 'Logged in successfully', token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    register,
    login,
}