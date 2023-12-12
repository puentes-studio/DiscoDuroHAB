import getPool from './getPool.js';

const main = async () => {
    let pool;

    try {
        pool = await getPool();

        console.log('Dropping existing tables...');

        await pool.query(
            'DROP TABLE IF EXISTS Folders, Files, Users'
        );

        console.log('Creating tables...');

        // Create User Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

          // Create Folders Table
          await pool.query(`
          CREATE TABLE IF NOT EXISTS Folders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            folder_name VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            user_id INT UNSIGNED NOT NULL,
            FOREIGN KEY (user_id) REFERENCES Users(id)
        )
      `);

        // Create Files Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Files (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INTEGER UNSIGNED NOT NULL,
                file_name VARCHAR(100) NOT NULL,
                folder_id INTEGER NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id),
                FOREIGN KEY (folder_id) REFERENCES Folders(id)
            )
        `);

      

        console.log('Tables created successfully!⚡');
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

// Execute the function
main();
