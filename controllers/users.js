import generateError  from "../helpers.js";
import  crearUsuario  from "../db/usersDb.js";

const newUserController = async (req, res, next) => {

     try {
        const {user_name, email, password} = req.body;
        
        // SUSTITUIR ESTO POR JOI
        if(!user_name || !email || !password) {

            throw generateError('Debes ingresar un nombre de usuario, un email y una contraseña', 400);
        
        };

        const id = await crearUsuario(user_name, email, password); //Función que espera a la función creada en usersDb.js

        res.send({
            status: 'error',
            message: 'Aún no implementado'
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