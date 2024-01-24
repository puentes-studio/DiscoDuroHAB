import { getFilesFromDatabase } from "../db/filesDb.js";
import { createFolder, deleteFolderById, getAllFoldersWithFiles, getFolderById } from "../db/folders.js";
import { generateError } from "../helpers.js";
import fs from "fs/promises";
import path from "path";


//A LOS CONTROLADORES DE AQUÍ ABAJO SOLO DEBEN ACCEDER USUARIOS REGISTRADOS CON UN TOKEN VERIFICADO

//CONTROLADOR QUE PERMITE CREAR UNA NUEVA CARPETA EXCLUSIVAMENTE A USUARIOS REGISTRADOS
const newFolderController = async (req, res, next) => {

    try {

        const {folderName} = req.body; //Función para ponerle nombre a la carpeta

        if(!folderName || folderName.length > 100) {
            throw generateError('La carpeta debe de tener un nombre y estar compuesto por menos de 100 caracteres', 400);
        }

        
        const id = await createFolder(req.userId, folderName);
        
        const pathFolder = path.join(process.cwd() ,"uploads", String(req.userId), String(id));

        try {
            await fs.mkdir(pathFolder);
          } catch (error) {
            throw generateError("Error creando carpeta de usuario", 500);
          }

        res.send({
            status: 'ok',
            message: `Nueva carpeta creada correctamente con id: ${id}`
        });
     } catch (error) {
        next(error);
     }
};


const getFoldersController = async (req, res, next) => { //Función que devuelve un listado de las carpetas creadas en la base de datos y los archivos del interior
    try {

        const data = await getAllFoldersWithFiles(req.userId);

        res.send({
            status: 'ok',
            data,
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

         // Si la carpeta no esta vacia devuelvo un error
        const folderContents = await getFilesFromDatabase(req.userId, id);

        if (folderContents.length > 0) {
            throw generateError('No se puede eliminar una carpeta no vacía. Elimina los archivos/carpetas de su interior primero', 400);
        };

        const pathFolder = path.join(process.cwd(), "uploads", `${req.userId}`, id);

         // Borro carpeta en FS
         console.log('Ruta de la carpeta a eliminar:', pathFolder);

         await fs.rm(pathFolder, {recursive: true}); 

    

        //Borrar carpeta en el DB
         await deleteFolderById(id);


        res.send({
            status: 'ok',
            message: `La carpeta con id: ${id} fue borrada`,
        });
     } catch (error) {
        console.error('Error durante la eliminación de la carpeta:', error);
        next(error);
     }
};


export {
    getFoldersController,
    newFolderController,
    getSingleFolderController,
    deleteFolderController,
};