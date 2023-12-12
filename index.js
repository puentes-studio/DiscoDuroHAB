//IMPORTACIONES
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { newUserController, getUserController, loginController } from './controllers/users.js' //Importamos controladores de users.js
import { getFilesController, newFileController, getSingleFileController, deleteFileController } from './controllers/files.js' //Importamos controladores de files.js
import { getFoldersController, newFolderController, getSingleFolderController, deleteFolderController } from './controllers/folders.js' //Importamos controladores de folders.js



dotenv.config();


const app = express();

app.use(express.json()); //Middleware que trata de procesar las peticiones a formato JSON
app.use(express.json());
app.use(routes);
app.use(morgan('dev')); // Middleware for logging HTTP requests
app.use(bodyParser.json()); // Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));




//RUTAS DE USUARIO
app.post('/users', newUserController);
app.get('/users/:id', getUserController);
app.post('/login', loginController);

//RUTAS DE FILES
app.get('/', getFilesController);
app.post('/', newFileController);
app.get('/file/:id', getSingleFileController);
app.delete('/file/:id', deleteFileController);

//RUTAS DE FOLDERS
app.get('/', getFoldersController);
app.post('/', newFolderController);
app.get('/folder/:id', getSingleFolderController);
app.delete('/folder/:id', deleteFolderController);



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
    console.log('Servidor funcionando exitosamente en el puerto 8080: ⚡⚡⚡⚡ http://localhost:8080 ⚡⚡⚡⚡');
});