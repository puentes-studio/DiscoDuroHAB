import { DataTypes } from 'sequelize';

const FileModel = (sequelize) => {
  const File = sequelize.define('File', {
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add other fields as needed
  });

  return File;
};

export default FileModel;