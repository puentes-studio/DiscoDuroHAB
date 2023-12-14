//IMPORTACIONES
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fileUpload from 'express-fileupload'; //Esto en un futuro servirá para subir ARCHIVOS a la tabla de FILES (TRABAJANDO EN ELLO)

import {
    newUserController,
    getUserController,
    loginController,
} from './controllers/users.js' //Importamos controladores de users.js

import {
    getFilesController,
    newFileController,
    getSingleFileController,
    deleteFileController,
} from './controllers/files.js' //Importamos controladores de files.js

import {
    getFoldersController,
    newFolderController,
    getSingleFolderController,
    deleteFolderController,
} from './controllers/folders.js' //Importamos controladores de folders.js

import { authorizationUser } from './middlewares/authorization.js'; //Importamos middleware encargado de comprobar peticiones hechas por usuarios registrados



dotenv.config();


const app = express();

app.use(express.json()); //Middleware que trata de procesar las peticiones a formato JSON
app.use(morgan('dev')); //Middleware de Gestión de Peticiones
app.use(fileUpload); //Middleware que permitirá subir archivos (TRABAJANDO EN ELLO)



//RUTAS DE USUARIO
app.post('/users', newUserController);
app.get('/users/:id', getUserController);
app.post('/login', loginController);

//RUTAS DE FOLDERS
app.post('/', authorizationUser, newFolderController);  //Estamos trabajando en la raíz, por eso solo la '/', para subir carpetas a la raíz
app.get('/', getFoldersController);
app.get('/folder/:id', getSingleFolderController);
app.delete('/folder/:id', deleteFolderController);

//RUTAS DE FILES
app.get('/files', getFilesController);
app.post('/files', newFileController);
app.get('/file/:id', getSingleFileController);
app.delete('/file/:id', deleteFileController);

// Middleware 404 NOT FOUND
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'NOT FOUND',
    });
});


// Middleware de Gestión de Errores
app.use((error, req, res, next) => {
    console.error(error);

    res.status(error.httpStatus || 500).send({
        status: 'error',
        message: error.message,
    });
});


//LANZAR SERVIDOR
app.listen(8080,()=>{
    console.log('Servidor funcionando exitosamente en el puerto 8080: http://localhost:8080 ⚡');
});