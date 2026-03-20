const prisma =require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async ({name, email, password }) => {
    const existeUsuario = await prisma.users.findUnique({
        where : { email }
    });

    if (existeUsuario) {
        throw new Error('Email ya registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
        data : {
            NAME: name,
            email,
            PASSWORD: hashedPassword
        }
    });

    return {
        message : 'Usuario registrado correctamente',
        user: {
            id : user.id,
            name : user.NAME,
            email : user.email
        }
    }
}

const login = async ({ email, password }) => {
    const user = await prisma.users.findUnique({
        where : { email }
    });

    if (!user) {
        throw new Error('Email o contraseña inválidos');
    }

    const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);

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
        token
    }
} 

const getUsers = async () => {
    return await prisma.users.findMany({
        select : {
            id : true,
            NAME : true,
            email : true
        }
    });
}

const getUserById = async (id) => {
    const user = await prisma.users.findUnique({
        where : { id: Number(id) },

        select : {
            id : true,
            NAME : true,
            email : true
        }
    });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    return user;
}

const updateUser = async (id, {name, email, password}) => {
    const user = await prisma.users.findUnique({
        where : { id: Number(id) }
    });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    return await prisma.users.update({
        where : { id: Number(id) },
        data : {
            NAME : name,
            email,
            PASSWORD : hashedPassword
        },
        select : {
            id : true,
            NAME : true,
            email : true
        }
    });
}

const deleteUser = async (id) => {
    const user = await prisma.users.findUnique({
        where : { id: Number(id) }
    });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    await prisma.users.delete({
        where : { id: Number(id) }
    });

    return { message : 'Usuario borrado correctamente' };
}


module.exports = {
    register,
    login,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
}


