import { createFolder, deleteFolderById, getAllFolders, getFolderById } from "../db/folders.js";
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


const getSingleFolderController = async (req, res, next) => { //Función que devuelve la carpeta creada de un usuario a través de su ID
    try {
        
        const {id} = req.params;
        const folder = await getFolderById(id);

        res.send({
            status: 'ok',
            data: folder,
        });
     } catch (error) {
        next(error);
     }
};

const deleteFolderController = async (req, res, next) => { //Función que permite borrar una carpeta si el ID del usuario y el de la carpeta coinciden
    try {

        //req.userId
        const {id} = req.params;

        //Conseguir los datos de la carpeta/folder que se quiere borrar
        const folder = await getFolderById(id);

        console.log('ID de usuario actual:', req.userId);
        console.log('ID de usuario de la carpeta:', folder.user_id);


        //Comprobar que el usuario que está usando el token es el mismo que creó la carpeta que se quiere borrar
        if(req.userId !== folder.user_id) {
             throw generateError('Estás intentando borrar una carpeta que no es tuya', 401);
         };
        //Borrar carpeta
         await deleteFolderById(id);


        res.send({
            status: 'ok',
            message: `La carpeta con id: ${id} fue borrada`,
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