import { generateError } from "../helpers.js";
import getPool from "./getPool.js";

// Funciones de la base de datos
const getFilesFromDatabase = async (userId) => {
    const pool = await getPool();
    const [result] = await pool.query('SELECT * FROM Files WHERE user_id = ?', [userId]);
    return result;
};

const createFileInDatabase = async (userId, fileName, folderId) => {
    const pool = await getPool();

    // Asegúrate de tener una columna is_in_root en tu tabla de archivos
    const [result] = await pool.query('INSERT INTO Files (user_id, file_name, folder_id, is_in_root) VALUES (?, ?, ?, ?)', [userId, fileName, folderId, folderId ? 0 : 1]);

    return result.insertId;
};

const getSingleFileFromDatabase = async (userId, fileId) => {
    const pool = await getPool();
    const [result] = await pool.query('SELECT * FROM Files WHERE user_id = ? AND id = ?', [userId, fileId]);
    return result[0];
};

const deleteFileFromDatabase = async (userId, fileId) => {
    const pool = await getPool();
    console.log('Deleting file. UserId:', userId, 'FileId:', fileId);

    try {
        const [result] = await pool.query('DELETE FROM Files WHERE user_id = ? AND id = ?', [userId, fileId]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error al eliminar el archivo de la base de datos:', error);
        throw error;
    } finally {
        if (pool) {
            pool.end();
        }
    }
};


export {
    getFilesFromDatabase,
    createFileInDatabase,
    getSingleFileFromDatabase,
    deleteFileFromDatabase,
};