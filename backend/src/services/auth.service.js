const prisma =require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async ({ email, password }) => {
    const user = await prisma.user.findUnique({
        where : { email }
    });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
        { 
            userId: 
            user.id 
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h"}
    );


    return{
        message : 'Login successful',
        token
    }
} 

module.exports = {
    login
}