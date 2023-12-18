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
    const [result] = await pool.query('INSERT INTO Files (user_id, file_name, folder_id) VALUES (?, ?, ?)', [userId, fileName, folderId]);
    return result.insertId;
};

const getSingleFileFromDatabase = async (userId, fileId) => {
    const pool = await getPool();
    const [result] = await pool.query('SELECT * FROM Files WHERE user_id = ? AND id = ?', [userId, fileId]);
    return result[0];
};

const deleteFileFromDatabase = async (userId, fileId) => {
    const pool = await getPool();
    const [result] = await pool.query('DELETE FROM Files WHERE user_id = ? AND id = ?', [userId, fileId]);
    return result.affectedRows;
};


export {
    getFilesFromDatabase,
    createFileInDatabase,
    getSingleFileFromDatabase,
    deleteFileFromDatabase,
};