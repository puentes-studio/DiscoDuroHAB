import { generateError } from "../helpers.js";
import getPool from "./getPool.js";

// Obtiene todos los archivos de un usuario desde la base de datos
const getFilesFromDatabase = async (userId) => {
    const pool = await getPool();
    return (await pool.query('SELECT * FROM Files WHERE user_id = ?', [userId]))[0];
};

// Crea un nuevo archivo en la base de datos y devuelve su ID
const createFileInDatabase = async (userId, fileName, folderId) => {
    const pool = await getPool();
    return (await pool.query('INSERT INTO Files (user_id, file_name, folder_id) VALUES (?, ?, ?)', [userId, fileName, folderId]))[0].insertId;
};

// Obtiene un archivo específico de un usuario desde la base de datos
const getSingleFileFromDatabase = async (userId, fileId) => {
    const pool = await getPool();
    return (await pool.query('SELECT * FROM Files WHERE user_id = ? AND id = ?', [userId, fileId]))[0][0];
};

// Elimina un archivo de la base de datos y devuelve el número de filas afectadas
const deleteFileFromDatabase = async (userId, fileId) => {
    const pool = await getPool();
    return (await pool.query('DELETE FROM Files WHERE user_id = ? AND id = ?', [userId, fileId]))[0].affectedRows;
};

// Exporta las funciones como controladores
export {
    getFilesFromDatabase,
    createFileInDatabase,
    getSingleFileFromDatabase,
    deleteFileFromDatabase,
};