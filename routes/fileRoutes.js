import express from 'express';
import FileController from '../controllers/files.js';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/', FileController.listFiles);
router.post('/', FileController.uploadFile);
router.delete('/:fileId', FileController.deleteFile);
router.get('/:fileId/download', FileController.downloadFile);
router.post('/folders', FileController.createFolder);
router.put('/:fileId/update-name', FileController.updateFileName);
router.put('/:folderId/update-name', FileController.updateFolderName);


export default router;
