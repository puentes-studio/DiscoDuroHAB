//IMPORTACIONES
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

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



dotenv.config();


const app = express();

app.use(morgan('dev'))



//RUTAS DE USUARIO
app.post('/users', newUserController);
app.get('/users:id', getUserController);
app.post('/login', loginController);

//RUTAS DE FILES
app.get('/', getFilesController);
app.post('/', newFileController);
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