import getPool from './getPool.js';

const USERS_TABLE = 'Users';
const FILES_TABLE = 'Files';
const FOLDERS_TABLE = 'Folders';

const main = async () => {
    const pool = await getPool();

    try {
        console.log('Deleting tables...');

        await pool.query('DROP TABLE IF EXISTS ??, ??, ??', [USERS_TABLE, FILES_TABLE, FOLDERS_TABLE]);

        console.log('Creating tables...');

        const createUserTableQuery = `
            CREATE TABLE IF NOT EXISTS ${USERS_TABLE} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                password VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `;

        const createFilesTableQuery = `
            CREATE TABLE IF NOT EXISTS ${FILES_TABLE} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                file_name VARCHAR(100) NOT NULL,
                file_path VARCHAR(255) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES ${USERS_TABLE}(id)
            )
        `;

        const createFoldersTableQuery = `
            CREATE TABLE IF NOT EXISTS ${FOLDERS_TABLE} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                folder_name VARCHAR(100) NOT NULL,
                folder_path VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES ${USERS_TABLE}(id)
            )
        `;

        await pool.query(createUserTableQuery);
        await pool.query(createFilesTableQuery);
        await pool.query(createFoldersTableQuery);

        console.log('Tables created successfully!');
    } catch (err) {
        console.error('Error executing queries:', err);
    } finally {
        await pool.end(); 
        process.exit();
    }
};

main();
