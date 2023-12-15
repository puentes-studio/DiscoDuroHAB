import fileUpload from "express-fileupload";


//GESTOR DE ERRORES
const generateError = (message, status) => {
    const error = new Error (message);
    error.httpStatus = status;

    return error;
}

//CREA UNA RUTA PARA LOS ARCHIVOS SI NO EXISTE, DE TAL FORMA DE QUE SE PUEDA ACCEDER A ELLOS O ALMACENARLOS
const createPathIfNotExists = async (path) => {
    try {
        await fileUpload.access(path);
    } catch {
        await fileUpload.mkdir(path);
    }
}

export {
    generateError,
    createPathIfNotExists,
};