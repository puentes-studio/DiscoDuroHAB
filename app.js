// Importamos módulos
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Configuramos variables de entorno que nos permiten almacenar información confidencial como contraseñas sin comprometer la seguridad
dotenv.config();

// Creamos servidor con express
const app = express();

// Configuramos puerto
const PORT = process.env.PORT || 8000;

// Configuramos middleware
app.use(cors());
app.use(express.json());

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`¡La aplicación está lista y escuchando en el puerto ${PORT}!`);
});