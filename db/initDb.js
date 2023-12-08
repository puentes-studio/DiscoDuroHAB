import getPool from './getPool.js'

const main = async () => {
    // Variable que almacenará una conexión con la base de datos.
    let pool;

    try {
        pool = await getPool();

        console.log('Borrando tablas...');

        await pool.query(
            'DROP TABLE IF EXISTS Folders, Files, Users'
        );

        console.log('Creando tablas...');

        // Crear Tabla de usuarios

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                password VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);


        // Crear Tabla de Ficheros

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Files (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                file_name VARCHAR(100) NOT NULL,
                file_path VARCHAR(255) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id)
            )
        `);


        // Crear Tabla de Carpetas

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Folders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                folder_name VARCHAR(100) NOT NULL,
                folder_path VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id)
            )
        `);


        console.log('¡Tablas creadas con éxito!');
    } catch (err) {
        console.error(err);
    } finally {
        // Cerramos el proceso.
        process.exit();
    }
};

// Ejecutamos la función anterior.
main();


