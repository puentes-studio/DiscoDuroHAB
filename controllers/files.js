const getFilesController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Aún no implementado'
        });
     } catch (error) {
        next(error);
     }
};

const newFileController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Aún no implementado'
        });
     } catch (error) {
        next(error);
     }
};

const getSingleFileController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Aún no implementado'
        });
     } catch (error) {
        next(error);
     }
};

const deleteFileController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Aún no implementado'
        });
     } catch (error) {
        next(error);
     }
};


export {
    getFilesController,
    newFileController,
    getSingleFileController,
    deleteFileController,
};