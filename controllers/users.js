import {generateError} from "../helpers.js";
import {crearUsuario, getUserByEmail, getUserById} from "../db/usersDb.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

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
        
        const {id} = req.params;

        const user = await getUserById(id);

        res.send({
            status: 'ok',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const loginController = async (req, res, next) => {  
    try {

        const {email, password} = req.body;

        if(!email || !password) {
             throw generateError('Debes ingresar un email y una password correctas', 400);
        }

     //Función que recoge los datos del usuario de la DataBase a través de su email
        const user = await getUserByEmail(email);

     //Comprueba que coincide con la contraseña comparando la que ingresa el usuario con la que está en la DataBase
        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) {
            throw generateError('Contraseña incorrecta', 401);
        }

     //Se crea el PayLoad del Token
        const PayLoad = {id: user.id};


     //Se firma el Token con el SECRETO definido en el archivo .env
        const token = jsonwebtoken.sign(PayLoad, process.env.SECRET, {
            expiresIn: '30d',
        });


     //Se envía el Token
        
        res.send({
            status: 'ok',
            data: token,
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
