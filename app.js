import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

dotenv.config();


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(routes);
app.use(errorController);
app.use(express.static('public')); //DARLE UNA VUELTA A ESTO



//RUTAS

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