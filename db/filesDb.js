import getPool from "./getPool.js";
import { generateError } from "../helpers.js";

// Función para obtener todos los archivos de un usuario por su ID
const getFilesFromDatabase = async (userId) => {
    try {
        let pool = await getPool();

        const [result] = await pool.query(`
            SELECT id, user_id, file_name, folder_id FROM Files WHERE user_id = ?
        `, [userId]);

        return result;
    } catch (error) {
        throw generateError('Error al obtener los archivos de la base de datos', 500);
    }
};

// Función para crear un archivo en la base de datos
const createFile = async (userId, fileName, folderId, fileType) => {
    try {
        console.log('Creating file with type:', fileType);

        let pool = await getPool();

        const [result] = await pool.query(`
            INSERT INTO Files (user_id, file_name, folder_id, file_type) VALUES (?, ?, ?, ?)
        `, [userId, fileName, folderId, fileType]);

        return result.insertId;
    } catch (error) {
        console.error('Error creating file:', error);

        throw generateError('Error al crear el archivo en la base de datos', 500);
    }
};

// Función para obtener la información de un archivo por su ID
const getFileById = async (id) => {
    try {
        let pool = await getPool();

        const [result] = await pool.query(`
            SELECT id, user_id, file_name, folder_id FROM Files WHERE id = ?
        `, [id]);

        if (result.length === 0) {
            throw generateError(`El archivo con id: ${id} no existe`, 404);
        }

        return result[0];
    } catch (error) {
        throw generateError('Error al obtener la información del archivo', 500);
    }
};

// Función para borrar un archivo por su ID
const deleteFileById = async (id) => {
    try {
        let pool = await getPool();

        await pool.query(`DELETE FROM Files WHERE id = ?`, [id]);
    } catch (error) {
        throw generateError('Error al borrar el archivo de la base de datos', 500);
    }
};

export {
    createFile,
    getFileById,
    deleteFileById,
    getFilesFromDatabase,
};