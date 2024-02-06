import path from "path";
import {
  createFile,
  getFileById,
  deleteFileById,
  getFilesFromDatabase,
} from "../db/filesDb.js";
import { generateError } from "../helpers.js";
import fs from "fs/promises";

const getFilesController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const files = await getFilesFromDatabase(userId);

    res.json({
      status: "ok",
      data: files,
    });
  } catch (error) {
    next(error);
  }
};
// Controlador para crear un nuevo archivo
const newFileController = async (req, res, next) => {
  try {
    const { folderId } = req.body;
    const fileObject = req.files.fileToUpload;

    if (!fileObject) {
      throw generateError("Falta file", 400);
    }

    const id = await createFile(req.userId, fileObject, folderId);

    const files = await getFilesFromDatabase(req.userId, folderId);

    res.send({
      status: "ok",
      message: `Nuevo archivo creado correctamente con id: ${id}`,
      data:{
        files
      }
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
      status: "ok",
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

    //Borra FILE físicamente en uploeads. Obtener información de File.
    const dataFile = await getFileById(id);

    let pathFile;

    if (dataFile.folder_id) {
      pathFile = path.join(
        process.cwd(),
        "uploads",
        `${req.userId}`,
        `${dataFile.folder_id}`,
        dataFile.file_name
      );
    } else {
      pathFile = path.join(
        process.cwd(),
        "uploads",
        `${req.userId}`,
        dataFile.file_name
      );
    }

    //Borramos file
    await fs.unlink(pathFile);

    await deleteFileById(id);

    res.send({
      status: "ok",
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
