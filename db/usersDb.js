import getPool from "./getPool.js"; //Conexión con nuestra base de datos
import {generateError} from "../helpers.js"; //Importamos gestor de errores de helpers.js
import bcrypt from 'bcrypt';

//FUNCIÓN QUE DEVUELVE LA INFORMACIÓN PÚBLICA DE UN USUARIO A TRAVÉS DE SU ID
const getUserById = async (id) => {

  let pool = await getPool();
  
  const [result] = await pool.query(`SELECT id, user_name, email, created_at FROM Users WHERE id = ?`, [id]);  
  
  if(result.length === 0) {
      throw generateError('No hay ningún usuario con ese id', 404);
     }

  return result[0];       //De esta forma se devuelve el primer elemento

  };


//FUNCIÓN PARA CREAR USUARIO EN BASE DE DATOS Y GENERAR ID
const crearUsuario = async (user_name, email, password) => {

       let pool = await getPool(); //Función que conecta con la base de datos

        //Comprobar que no exista ese nombre de usuario
        const [userName] = await pool.query(`
          SELECT id FROM Users WHERE user_name = ?
        `,
          [user_name]
        );

        if (userName.length > 0) { //Esto indica que si es mayor que uno, ya hay un usuario con ese nombre
            throw generateError('Ya existe ese nombre de usuario', 409)
        };

        //Comprobar que no exista un usuario con ese email
        const [userEmail] = await pool.query(`
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
        const newUser = await pool.query(`
           INSERT INTO Users (user_name, email, password) VALUES (?, ?, ?)
        `,
          [user_name, email, passwordEncrypt]
        );

        //console.log(newUser)

        //Devolver id
        return newUser[0].insertId;
};


//FUNCIÓN PARA HACER LOGIN DE USUARIO A TRAVÉS DE SU EMAIL
const getUserByEmail = async (email) => {

  let pool = await getPool();
  
  const [result] = await pool.query(`SELECT * FROM Users WHERE email = ?`, [email]);  
  
  if(result.length === 0) {
      throw generateError('No hay ningún usuario con ese email', 404);
     }

  return result[0];       //De esta forma se devuelve el primer elemento

  };


export {
  crearUsuario,
  getUserById,
  getUserByEmail,
};