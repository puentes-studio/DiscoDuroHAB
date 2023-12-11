import getPool from "./getPool.js"; //Conexión con nuestra base de datos
import generateError from "../helpers.js"; //Importamos gestor de errores de helpers.js

//FUNCIÓN PARA CREAR USUARIO EN BASE DE DATOS Y DEVOLVER SU ID
const crearUsuario = async (user_name, email, password) => {

    let connection;

    try {

        connection = await getPool(); //Función que conecta con la base de datos

        //Comprobar que no exista ese nombre de usuario
        const [userName] = await connection.query(`
          SELECT id FROM Users WHERE user_name = ?
        `,
          [user_name]
        );

        if (userName.length > 0) { //Esto indica que si es mayor que uno, ya hay un usuario con ese nombre
            throw generateError('Ya existe ese nombre de usuario', 409)
        }

        //Comprobar que no exista un usuario con ese email

        //Encriptar la password

        //Crear usuario

        //Devolver id


    } finally {                                //No hace falta hacer un catch porque de haber error pasa por el gestor de errores
       if(connection) connection.release();
    }

    

};


export {
    crearUsuario
};