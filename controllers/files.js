
import { generateError } from "../helpers.js";
import getPool from "../db/getPool.js";

const getFilesController = async (req, res, next) => {
    try {
        const userId = req.userId;

        // Utiliza tu función correspondiente para obtener la lista de files desde la base de datos
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
        const { fileName, folderId } = req.body;

        if (!fileName || !folderId) {
            throw generateError('Debes proporcionar un nombre y carpeta para el archivo', 400);
        }

        // Utiliza tu función correspondiente para crear el archivo en la base de datos
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

        // Utiliza tu función correspondiente para obtener información sobre un solo archivo desde la base de datos
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

        // Utiliza tu función correspondiente para eliminar el archivo de la base de datos
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

