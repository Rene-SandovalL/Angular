const prisma =require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error('Email y contraseña son requeridos');
    }

    const user = await prisma.users.findUnique({
        where : { email },
        select : {
            id : true,
            name : true,
            email : true,
            password : true
        }
    });

    if (!user || typeof user.password !== 'string') {
        throw new Error('Email o contraseña inválidos');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Email o contraseña inválidos');
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
        token,
        user: {
            id : user.id,
            name : user.name,
            email : user.email
        }
    }
} 

module.exports = {
    login
}


