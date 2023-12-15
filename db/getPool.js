/*import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASS,
    MYSQL_DB
} = process.env;

let pool;

const getPool = async () =>{
    try { //Inicia TRY
        if(!pool){ //Verifico que el pool no esté inicializado anteriormente

            //Crear pool temporal para dar de alta la Base si es que no existe
            const poolTemp = mysql.createPool({
                host: MYSQL_HOST, //envio el host para la conexión
                user: MYSQL_USER, //envio el user 
                password: MYSQL_PASS, //envio el password
            })

            await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            pool = mysql.createPool({ //Comienzo a crear el pool mediante MYSQL y le envío un objeto
                host: MYSQL_HOST, //envio el host para la conexión
                user: MYSQL_USER, //envio el user 
                password: MYSQL_PASS, //envio el password
                connectionLimit: 10, //determino la cantidad máxima de conexiones (10 por poner 10)
                database: MYSQL_DB, //determino la base a la cual conectarme
                timezone: 'Z' //Z para horario UTC (horario global)
            }) //cierro el createPool

        } //cierro el if donde valido si no está inicializado el pool

        return pool; //devuelvo el pool ya creado
    } catch (error) { //catcheo el error, recibo error como variable
        console.error(error) //muestro el error
    } //finaliza el trycatch
}

export default getPool;

*/

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASS,
    MYSQL_DB
} = process.env;

let pool;

const getPool = async () => {
    try {
        // Verifica si el pool ya está inicializado
        if (!pool) {
            // Crea un pool temporal para dar de alta la base de datos si no existe
            const poolTemp = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
            });

            await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            // Crea el pool principal
            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                connectionLimit: 10,
                database: MYSQL_DB,
                timezone: 'Z'
            });
        }

        return pool; // Devuelve el pool ya creado
    } catch (error) {
        console.error(error); // Imprime el error en la consola
        throw error; // Lanza el error nuevamente para que la aplicación lo maneje
    }
}

export default getPool;