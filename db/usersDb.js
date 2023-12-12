import getPool from "./getPool.js"; //Conexión con nuestra base de datos
import generateError from "../helpers.js"; //Importamos gestor de errores de helpers.js
import bcrypt from 'bcrypt';

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
        };

        //Comprobar que no exista un usuario con ese email
        const [userEmail] = await connection.query(`
          SELECT id FROM Users Where email = ?
        `,
          [email]
        );

        if (userEmail.length > 0) {
            throw generateError('Ya existe un usuario con este email', 409) //Misma función que arriba pero referida al email de usuario
        };

        //Encriptar la password
        const passwordEncrypt = await bcrypt.hash(password, 8); //8 son las vueltas que da a la encriptación para mayor seguridad de la contraseña


        //Crear usuario
        const newUser = await connection.query(`
           INSERT INTO Users (user_name, email, password) VALUES (?, ?, ?)
        `,
          [user_name, email, passwordEncrypt]
        );

        //Devolver id
        return newUser.insertId;


    } finally {                                //No hace falta hacer un catch porque de haber error pasa por el gestor de errores
       if(connection) connection.release();
    }

    

};


export default {
    crearUsuario
};