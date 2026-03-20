const prisma =require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async ({ name, email, password }) => {
    if (!name || !email || !password) {
        throw new Error('Nombre, email y contraseña son requeridos');
    }

    const existeUsuario = await prisma.users.findUnique({
        where : { email }
    });

    if (existeUsuario) {
        throw new Error('Email ya registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
        data : {
            name,
            email,
            password: hashedPassword
        }
    });

    return {
        message : 'Usuario registrado correctamente',
        user: {
            id : user.id,
            name : user.name,
            email : user.email
        }
    }
}

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

const getUsers = async () => {
    return await prisma.users.findMany({
        select : {
            id : true,
            name : true,
            email : true
        }
    });
}

const getUserById = async (id) => {
    const user = await prisma.users.findUnique({
        where : { id: Number(id) },

        select : {
            id : true,
            name : true,
            email : true
        }
    });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    return user;
}

const updateUser = async (id, { name, email, password }) => {
    const user = await prisma.users.findUnique({
        where : { id: Number(id) }
    });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const data = {
        ...(name !== undefined ? { name } : {}),
        ...(email !== undefined ? { email } : {})
    };

    if (password) {
        data.password = await bcrypt.hash(password, 10);
    }

    if (Object.keys(data).length === 0) {
        throw new Error('No hay datos para actualizar');
    }

    return await prisma.users.update({
        where : { id: Number(id) },
        data,
        select : {
            id : true,
            name : true,
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


