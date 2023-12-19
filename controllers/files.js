import { createFile, getFileById, deleteFileById, getFilesFromDatabase } from "../db/filesDb.js";
import { generateError } from "../helpers.js";
import { authorizationUser } from "../middlewares/authorization.js";

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
// Controlador para crear un nuevo archivo
const newFileController = async (req, res, next) => {
    try {
        const { fileName, folderId } = req.body;

        if (!fileName || fileName.length > 100) {
            throw generateError('El archivo debe tener un nombre y estar compuesto por menos de 100 caracteres', 400);
        }

        const id = await createFile(req.userId, fileName, folderId);

        res.send({
            status: 'ok',
            message: `Nuevo archivo creado correctamente con id: ${id}`
        });
    } catch (error) {
        next(error);
    }
};

// Controlador para obtener la información de un archivo por su ID
const getSingleFileController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const file = await getFileById(id);

        res.send({
            status: 'ok',
            data: file,
        });
    } catch (error) {
        next(error);
    }
};

// Controlador para borrar un archivo por su ID
const deleteFileController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteFileById(id);

        res.send({
            status: 'ok',
            message: `El archivo con id: ${id} fue borrado`,
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