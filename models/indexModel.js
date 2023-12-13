import { Sequelize } from 'sequelize';
import UserModel from './User';
import FileModel from './File';
import { User, File } from './models'; // Import from the index.js file in the models directory



const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: 'mysql',
});

const User = UserModel(sequelize);
const File = FileModel(sequelize);

File.belongsTo(User); // Assuming a file belongs to a user

export { sequelize, User, File };