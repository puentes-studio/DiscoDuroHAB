const newUserController = async (req, res, next) => {

     try {
        const {user_name, email, password} = req.body;

        if(!user_name || !email || !password) {

            throw new Error('Debes ingresar un nombre de usuario, un email y una contraseña');
        
        }

        res.send({
            status: 'error',
            message: 'Aún no implementado'
        });
     } catch (error) {
        next(error);
     }
};

const getUserController = async (req, res, next) => {
    try {
        res.send({
            status: 'error',
            message: 'Aún no implementado'
        });
     } catch (error) {
        next(error);
     }
};

const loginController = async (req, res, next) => {
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
      newUserController,
      getUserController,
      loginController,
};