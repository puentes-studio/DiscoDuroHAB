import { generateError } from "../helpers.js";
import getPool from "./getPool.js";


const createFile = async (userId, fileName = '') => {
    let pool = await getPool();

    try {
        const [result] = await pool.query(
            `INSERT INTO Files (file_name, user_id) VALUES (?, ?)`,
            [fileName, userId]
        );

        return result.insertId;
    } catch (error) {
        console.error('Error creating file:', error.message);
        throw error;
    } finally {
        if (pool) {
            pool.release();
        }
    }
};

const updateFileNameById = async (id, newName) => {
    let pool = await getPool();

    try {
        const [result] = await pool.query(
            `UPDATE Files SET file_name = ? WHERE id = ?`,
            [newName, id]
        );

        console.log(`File name updated successfully for ID ${id}`);
    } catch (error) {
        console.error('Error updating file name:', error.message);
        throw error;
    } finally {
        if (pool) {
            pool.release();
        }
    }
};




const getFileById = async (id) => {

    let pool; 

    
     
     pool = await getPool();

     const [result] = await pool.query(`SELECT id, file_name, user_id FROM Files WHERE id = ?`, [id]);

        if (result.length === 0) {
            throw generateError(`La carpeta con id: ${id} no existe`)
        }
        console.log('Datos de la carpeta obtenidos:', result[0]);

        return result[0];
    
};


//Delete a file
const deleteFileById = async (id) => {

    let pool; 

    
     
     pool = await getPool();

     await pool.query(`DELETE FROM Files WHERE id = ?`, [id]);

       return;
    
};

//Get all files
const getAllFiles = async () => {

    let pool 

    
     pool = await getPool();

     const [result] = await pool.query(`SELECT * FROM Files ORDER BY created_at DESC`)

     return result;
    
};


export {createFile, getAllFiles, updateFileNameById, deleteFileById, };