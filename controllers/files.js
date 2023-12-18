import { createFile, getAllFiles, updateFileNameById, deleteFileById } from "../db/files.js";
import { generateError } from "../helpers.js";
import { authorizationUser } from "../middlewares/authorization.js";


const newFileController = async (req, res, next) => {

    try {

        const {fileName} = req.body; //file name

        if(!fileName || fileName.length > 100) {
            throw generateError('El archivo debe tener un nombre y estar compuesto por menos de 100 caracteres', 400);
        }

        const id = await createFile(req.userId, folderName);

        res.send({
            status: 'ok',
            message: `Nueva archivo creado correctamente con id: ${id}`
        });
     } catch (error) {
        next(error);
     }
};


const getFilesController = async (req, res, next) => { 
    try {

        const file = await getAllFiles();

        res.send({
            status: 'ok',
            data: file,
        });
     } catch (error) {
        next(error);
     }
};


const getSingleFileController = async (req, res, next) => { //Función que devuelve el archivo creada de un usuario a través de su ID
    try {
        
        const {id} = req.params;
        const file = await getFileById(id);

        res.send({
            status: 'ok',
            data: folder,
        });
     } catch (error) {
        next(error);
     }
};

const deleteFileController = async (req, res, next) => { //Función que permite borrar un archivo si el ID del usuario y el del archivo coinciden
    try {

        //req.userId
        const {id} = req.params;

        //Conseguir los datos de la carpeta/folder que se quiere borrar
        const file = await getFileById(id);

        console.log('ID de usuario actual:', req.userId);
        console.log('ID de usuario del archivo:', file.user_id);


        //Comprobar que el usuario que está usando el token es el mismo que creó la carpeta que se quiere borrar
        if(req.userId !== file.user_id) {
             throw generateError('Estás intentando borrar un archivo que no es tuyo', 401);
         };
        //Borrar carpeta
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
    newFileController,
    getFilesController,
    getSingleFileController,
    deleteFileController
};

// const getFilesController = async (req, res, next) => {
//     try {
//         res.send({
//             status: 'error',
//             message: 'Aún no implementado'
//         });
//      } catch (error) {
//         next(error);
//      }
// };

// const newFileController = async (req, res, next) => {
//     try {
//         res.send({
//             status: 'error',
//             message: 'Aún no implementado'
//         });
//      } catch (error) {
//         next(error);
//      }
// };

// const getSingleFileController = async (req, res, next) => {
//     try {
//         res.send({
//             status: 'error',
//             message: 'Aún no implementado'
//         });
//      } catch (error) {
//         next(error);
//      }
// };

// const deleteFileController = async (req, res, next) => {
//     try {
//         res.send({
//             status: 'error',
//             message: 'Aún no implementado'
//         });
//      } catch (error) {
//         next(error);
//      }
// };


// export {
//     getFilesController,
//     newFileController,
//     getSingleFileController,
//     deleteFileController,
// };