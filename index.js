//IMPORTACIONES
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fileUpload from 'express-fileupload'; //Esto en un futuro servirá para subir ARCHIVOS a la tabla de FILES
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { readFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { outputFile, outputFileSync } from 'fs-extra/esm';

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
const APIPORT = process.env.APIPORT || 8080;

// compruebo si el directorios static existe, si no existe lo creo


app.use(fileUpload()); //Middleware que permitirá subir archivos 
app.use(express.json()); //Middleware que trata de procesar las peticiones a formato JSON
app.use(morgan('dev')); //Middleware de Gestión de Peticiones
app.use(express.static('uploads')); //De esta forma todas los archivos subidos quedan almacenados en este directorio
app.use(cors());


//RUTAS DE USUARIO
app.post('/users', newUserController); 
app.get('/users/:id', getUserController); 
app.post('/login', loginController); 

//RUTAS DE FOLDERS
app.post('/', authorizationUser, newFolderController); 
app.get('/', getFoldersController); 
app.get('/folder/:id', getSingleFolderController); 
app.delete('/folder/:id', authorizationUser, deleteFolderController); 

//RUTAS DE FILES
app.get('/files', getFilesController);
app.post('/files', authorizationUser, newFileController);
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
app.listen(APIPORT,()=>{
    console.log('Servidor funcionando exitosamente en el puerto ${APIPORT}: http://localhost:${APIPORT} ⚡');
});