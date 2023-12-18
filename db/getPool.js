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
        if (!pool) {
            const poolTemp = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
            });

            // Ensure that the database creation is successful
            const createDbResult = await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);
            console.log('CREATE DATABASE Result:', createDbResult[0]);

            if (createDbResult[0].warningStatus === 0) {
                console.log(`Database '${MYSQL_DB}' created successfully.`);
            } else {
                console.error(`Failed to create database '${MYSQL_DB}'.`);
                throw new Error(`Failed to create database '${MYSQL_DB}'.`);
            }

            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                connectionLimit: 10,
                database: MYSQL_DB,
                timezone: 'Z'
            });
            console.log('MySQL connection pool initialized.');
        }

        return pool;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to initialize MySQL connection pool.');
    }
}

export default getPool;