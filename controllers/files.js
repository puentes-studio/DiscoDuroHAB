import { File, User } from '../models';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const FileController = {
  async listFiles(req, res) {
    try {
      const user = req.user;

      const files = await File.findAll({ where: { UserId: user.id } });

      res.json(files);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async uploadFile(req, res) {
    try {
      const user = req.user;
      const { originalname, buffer } = req.file;

      const filename = uuidv4() + path.extname(originalname);

      // Save file to the server or a cloud storage service

      const file = await File.create({
        filename,
        UserId: user.id,
      });

      res.status(201).json(file);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  async updateFileName(req, res) {
    try {
      const user = req.user;
      const fileId = req.params.fileId;
      const { newFileName } = req.body;

      if (!newFileName) {
        throw new Error('New file name is required');
      }

      const file = await File.findOne({ where: { id: fileId, UserId: user.id } });

      if (!file) {
        throw new Error('File not found');
      }

      file.filename = newFileName;
      await file.save();

      res.json(file);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async deleteFile(req, res) {
    try {
      const user = req.user;
      const fileId = req.params.fileId;

      const file = await File.findOne({ where: { id: fileId, UserId: user.id } });

      if (!file) {
        throw new Error('File not found');
      }

      // Delete the file from the server or cloud storage

      await file.destroy();

      res.json({ message: 'File deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async downloadFile(req, res) {
    try {
      const user = req.user;
      const fileId = req.params.fileId;

      const file = await File.findOne({ where: { id: fileId, UserId: user.id } });

      if (!file) {
        throw new Error('File not found');
      }

      // Implement file download logic here

      const filePath = path.join(__dirname, '..', 'uploads', file.filename);

      res.download(filePath, file.filename);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async createFolder(req, res) {
    try {
      const user = req.user;
      const { folderName } = req.body;

      if (!folderName) {
        throw new Error('Folder name is required');
      }

      const folder = await File.create({
        filename: folderName,
        UserId: user.id,
      });

      res.status(201).json(folder);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  async updateFolderName(req, res) {
    try {
      const user = req.user;
      const folderId = req.params.folderId;
      const { newFolderName } = req.body;

      if (!newFolderName) {
        throw new Error('New folder name is required');
      }

      const folder = await File.findOne({ where: { id: folderId, UserId: user.id } });

      if (!folder) {
        throw new Error('Folder not found');
      }

      folder.filename = newFolderName;
      await folder.save();

      res.json(folder);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default FileController;
