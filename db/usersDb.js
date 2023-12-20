import getPool from "./getPool.js"; //Conexión con nuestra base de datos
import {generateError} from "../helpers.js"; //Importamos gestor de errores de helpers.js
import bcrypt from 'bcrypt';

import { readFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { outputFile, outputFileSync } from 'fs-extra/esm';
import path from "path";

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
    let pool = await getPool();

    // ... (existing code for checking existing username and email)

    const passwordEncrypt = await bcrypt.hash(password, 8);

    const newUser = await pool.query(
        `INSERT INTO Users (user_name, email, password) VALUES (?, ?, ?)`,
        [user_name, email, passwordEncrypt]
    );

    const userId = newUser[0].insertId;
    const uploadsFolder = '/path/to/uploads'; // Update this path to your actual uploads folder path
    const userFolder = path.join(uploadsFolder, String(userId));

    try {
        await fs.mkdir(userFolder);
    } catch (error) {
        throw generateError('Error creating user folder', 500);
    }

    return userId;
};

// Example usage
crearUsuario('john_doe', 'john@example.com', 'password123')
    .then((userId) => {
        console.log(`User created with ID: ${userId}`);
    })
    .catch((error) => {
        console.error(error);
    });


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
