//FUNCIONES QUE TENGAN QUE VER CON LAS CARPETAS

import { generateError } from "../helpers.js";
import getPool from "./getPool.js";

const createFolder = async (userId, folderName = '') => {

    let pool = await getPool();

    const [result] = await pool.query(`INSERT INTO Folders (id, folder_name) VALUES(?, ?)`, [userId, folderName]);

    return result.insertId;
   
};


export {createFolder};