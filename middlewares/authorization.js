import { generateError } from "../helpers.js";
import jsonwebtoken from 'jsonwebtoken';

//MIDDLEWARE QUE COMPRUEBA QUE LAS PETICIONES LAS HACE UN USUARIO REGISTRADO MEDIANTE COMPROBACIÓN DE TOKEN
const authorizationUser = (req, res, next) => {

    try {
       const {authorization} = req.headers;

       if(!authorization) {
        throw generateError('Falta la cabecera de Authorization', 401);
    }

    //Comprobamos que el TOKEN sea correcto

    let token;

    try {
        token = jsonwebtoken.verify(authorization, process.env.SECRET); //Seguimos trabajando con el secreto definido en el archivo .env
    } catch {
        throw generateError('TOKEN incorrecto', 401);
    }

    //Introducimos la información del TOKEN en la petición para usarla en el controlador
    console.log(token)
    req.userId = token.id;

    //Saltamos al controlador
       next();  //Si todo va bien, va a next y salta a NewFolderController, en caso contrario hace catch del error y lo manda al gestor de errores
    } catch (error) {
      next(error);
    }
};


export {authorizationUser};