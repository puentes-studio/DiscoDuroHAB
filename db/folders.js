import { generateError } from "../helpers.js";
import getPool from "./getPool.js";

//FUNCIÓN QUE CREA UNA CARPETA Y LA INSERTA EN LA DATABASE EN SU TABLA CORRESPONDIENTE
const createFolder = async (userId, folderName = '') => {

    let pool = await getPool();

    const [result] = await pool.query(`INSERT INTO Folders (id, folder_name) VALUES(?, ?)`, [userId, folderName]);

    return result.insertId;
   
};


//FUNCIÓN PARA RECIBIR UNA LISTA DE TODAS LAS CARPETAS CREADAS
const getAllFolders = async () => {

    let pool 

    
     pool = await getPool();

     const [result] = await pool.query(`SELECT * FROM Folders ORDER BY created_at DESC`)

     return result;
    
};


export {createFolder, getAllFolders};