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
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_name VARCHAR(20) NOT NULL UNIQUE,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

          // Create Folders Table
          await pool.query(`
          CREATE TABLE IF NOT EXISTS Folders (
              id INT AUTO_INCREMENT PRIMARY KEY,
              folder_name VARCHAR(100) NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              user_id INT,
              FOREIGN KEY (user_id) REFERENCES Users(id)
          )
      `);

        // Create Files Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Files (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INTEGER NOT NULL,
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
