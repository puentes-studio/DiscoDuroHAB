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

        // registro, login

        // endpoint que devuelve todos los files y carpetas de un usuario:
        //get /disco
        //get /disco?dir=id_carpeta (req.query)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_name VARCHAR(20) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);


        // Crear Tabla de Carpetas

        // crea, elimina, renombra carpeta
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Folders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                folder_name VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);


        // Crear Tabla de Ficheros

        // subir, eliminar, renombrar file

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Files (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                file_name VARCHAR(100) NOT NULL,
                folder_id INT, -- Columna que referencia a Folders
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id),
                FOREIGN KEY (folder_id) REFERENCES Folders(id) -- Referencia a la tabla Folders
            )
        `);


        console.log('¡Tablas creadas con éxito!⚡');
    } catch (err) {
        console.error(err);
    } finally {
        // Cerramos el proceso.
        process.exit();
    }
};

// Ejecutamos la función anterior.
main();


