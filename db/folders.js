import { generateError } from "../helpers.js";
import getPool from "./getPool.js";

//FUNCIÓN QUE CREA UNA CARPETA Y LA INSERTA EN LA DATABASE EN SU TABLA CORRESPONDIENTE
const createFolder = async (userId, folderName = '') => {

    let pool = await getPool();

    const [result] = await pool.query(`INSERT INTO Folders (folder_name, user_id) VALUES (?, ?)`, [folderName, userId]);

    return result.insertId;
   
};


//FUNCIÓN PARA RECIBIR UNA LISTA DE TODAS LAS CARPETAS CREADAS
const getAllFoldersWithFiles = async () => {
    let pool;

    try {
        pool = await getPool();

        // Obtener todas las carpetas ordenadas por fecha de creación
        const [foldersResult] = await pool.query(`SELECT * FROM Folders WHERE user_id = ? ORDER BY created_at DESC`, [user.id]);

        // Para cada carpeta, obtener los archivos asociados
        const foldersWithFiles = await Promise.all(
            foldersResult.map(async (folder) => {
                // Consulta para obtener los archivos de esta carpeta
                const [filesResult] = await pool.query(`SELECT * FROM Files WHERE folder_id = ?`, [folder.id]);

                // Devolver objeto con la carpeta y sus archivos
                return {
                    folder,
                    files: filesResult,
                };
            })
        );

        return foldersWithFiles;
    } catch (error) {
        // Manejo de errores
        throw new Error('Error al obtener carpetas y archivos');
    }
};


//FUNCIÓN PARA RECIBIR UNA CARPETA POR SU ID
const getFolderById = async (id) => {

    let pool; 

    
     
     pool = await getPool();

     const [result] = await pool.query(`SELECT id, folder_name, user_id FROM Folders WHERE id = ?`, [id]);

        if (result.length === 0) {
            throw generateError(`La carpeta con id: ${id} no existe`)
        }
        console.log('Datos de la carpeta obtenidos:', result[0]);

        return result[0];
    
};


//FUNCIÓN PARA BORRAR CARPETAS CREADAS SIEMPRE Y CUANDO EL ID DEL USUARIO Y LA CARPETA BORRADA COINCIDA
const deleteFolderById = async (id) => {

    let pool; 

    
     
     pool = await getPool();

     await pool.query(`DELETE FROM Folders WHERE id = ?`, [id]);

       return;
    
};


export {createFolder, getAllFoldersWithFiles, getFolderById, deleteFolderById};