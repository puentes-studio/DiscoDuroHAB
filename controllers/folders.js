import { createFolder } from "../db/folders.js";
import { generateError } from "../helpers.js";
import { authorizationUser } from "../middlewares/authorization.js";

//A LOS CONTROLADORES DE AQUÍ ABAJO SOLO DEBEN ACCEDER USUARIOS REGISTRADOS CON UN TOKEN VERIFICADO

//CONTROLADOR QUE PERMITE CREAR UNA NUEVA CARPETA EXCLUSIVAMENTE A USUARIOS REGISTRADOS
const newFolderController = async (req, res, next) => {

    try {

        const {folderName} = req.body; //Función para ponerle nombre a la carpeta

        if(!folderName || folderName.length > 100) {
            throw generateError('La carpeta debe de tener un nombre y estar compuesto por menos de 100 caracteres', 400);
        }

        const id = await createFolder(req.userId, folderName);

        res.send({
            status: 'ok',
            message: `Nueva carpeta creada correctamente con id: ${id}`
        });
     } catch (error) {
        next(error);
     }
};


const getFoldersController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Aún no implementado'
        });
     } catch (error) {
        next(error);
     }
};


const getSingleFolderController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Aún no implementado'
        });
     } catch (error) {
        next(error);
     }
};

const deleteFolderController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Aún no implementado'
        });
     } catch (error) {
        next(error);
     }
};


export {
    getFoldersController,
    newFolderController,
    getSingleFolderController,
    deleteFolderController,
    authorizationUser,
};