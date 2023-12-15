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


//FUNCIÓN PARA RECIBIR UNA CARPETA POR SU ID
const getFolderById = async (id) => {

    let pool; 

    
     
     pool = await getPool();

     const [result] = await pool.query(`SELECT * FROM Folders WHERE id = ?`, [id]);

        if (result.length === 0) {
            throw generateError(`La carpeta con id: ${id} no existe`)
        }

        return result[0];
    
};


//FUNCIÓN PARA BORRAR CARPETAS CREADAS SIEMPRE Y CUANDO EL ID DEL USUARIO Y LA CARPETA BORRADA COINCIDA
const deleteFolderById = async (id) => {

    let pool; 

    
     
     pool = await getPool();

     const [result] = await pool.query(`DELETE FROM Folders WHERE id = ?`, [id]);

       return;
    
};


export {createFolder, getAllFolders, getFolderById, deleteFolderById};