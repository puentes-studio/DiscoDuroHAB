import { createFolder, getAllFolders } from "../db/folders.js";
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


const getFoldersController = async (req, res, next) => { //Función que devuelve un listado de las carpetas creadas en la base de datos
    try {

        const folders = await getAllFolders();

        res.send({
            status: 'ok',
            data: folders,
        });
     } catch (error) {
        next(error);
     }
};


const getSingleFolderController = async (req, res, next) => { //NO SE VA A IMPLEMENTAR EN PRINCIPIO
    try {
        res.send({
            status: 'error',
            message: 'Aún no implementado'
        });
     } catch (error) {
        next(error);
     }
};

const deleteFolderController = async (req, res, next) => { //TRABAJANDO EN ELLO

    //req.userId
    const {id} = req.params;

    //Conseguir los datos de la carpeta/folder que se quiere borrar


    //Comprobar que el usuario que está usando el token es el mismo que creó la carpeta que se quiere borrar

    //Borrar carpeta



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
};