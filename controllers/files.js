import { generateError } from "../helpers.js";
import jsonwebtoken from 'jsonwebtoken';
import { getFilesFromDatabase, createFileInDatabase, getSingleFileFromDatabase, deleteFileFromDatabase } from "../db/files.js";
import { getFolderIdByName } from "../db/folders.js";

const getFilesController = async (req, res, next) => {
    try {
        const userId = req.userId;
        const files = await getFilesFromDatabase(userId);

        res.json({
            status: 'ok',
            data: files,
        });
    } catch (error) {
        next(error);
    }
};

const newFileController = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { fileName, folderName } = req.body;

        if (!fileName) {
            throw generateError('Debes proporcionar un nombre para el archivo', 400);
        }

        let folderId = null;

        if (folderName) {
            folderId = await getFolderIdByName(folderName);
        }

        const fileId = await createFileInDatabase(userId, fileName, folderId);

        res.status(201).json({
            status: 'ok',
            message: `Nuevo archivo creado con id: ${fileId}`,
        });
    } catch (error) {
        next(error);
    }
};

const getSingleFileController = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const file = await getSingleFileFromDatabase(userId, id);

        if (!file) {
            throw generateError('No se encontró el archivo con el ID proporcionado', 404);
        }

        res.json({
            status: 'ok',
            data: file,
        });
    } catch (error) {
        next(error);
    }
};

const deleteFileController = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const deletedFileCount = await deleteFileFromDatabase(userId, id);

        if (deletedFileCount === 0) {
            throw generateError('No se encontró el archivo con el ID proporcionado', 404);
        }

        res.json({
            status: 'ok',
            message: 'Archivo eliminado con éxito',
        });
    } catch (error) {
        next(error);
    }
};

export {
    getFilesController,
    newFileController,
    getSingleFileController,
    deleteFileController,
};