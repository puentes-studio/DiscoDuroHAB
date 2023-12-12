import {generateError} from "../helpers.js";
import crearUsuario from "../db/usersDb.js";

const newUserController = async (req, res, next) => {
    try {
        const { user_name, email, password } = req.body;

        if (!user_name || !email || !password) {
            throw generateError('Debes ingresar un nombre de usuario, un email y una contraseña', 400);
        }

        const id = await crearUsuario(user_name, email, password);

        if (!id) {
            throw generateError('Error al crear el usuario', 500);
        }

        console.log('ID generado:', id);

        res.status(201).send({
            status: 'ok',
            message: `User created with id: ${id}`,
        });
    } catch (error) {
        next(error);
    }
};

const getUserController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Aún no implementado'
        });
    } catch (error) {
        next(error);
    }
};

const loginController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Aún no implementado'
        });
    } catch (error) {
        next(error);
    }
};

export {
    newUserController,
    getUserController,
    loginController,
};