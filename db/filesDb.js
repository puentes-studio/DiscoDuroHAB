import getPool from "./getPool.js";
import { generateError } from "../helpers.js";
import path from 'path';

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
const createFile = async (userId, fileNameObject, folderId, fileType) => {
    try {

        let pool = await getPool();

        // guardo file en el directorio static
        // FIXME: tenemos que poner en el path el id del usuario y el nombre de la subcarpeta. 
        
        const filePath = path.join(process.cwd(), 'uploads', fileNameObject.name);

        //console.log(filePath);

        fileNameObject.mv(filePath);

        console.log(">>>>>", userId)

        const [result] = await pool.query(`
            INSERT INTO Files (user_id, file_name, folder_id, file_type) VALUES (?, ?, ?, ?)
        `, [userId, fileNameObject.name, folderId, fileNameObject.mimetype]);

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