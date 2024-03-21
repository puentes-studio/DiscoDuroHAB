DISCO DURO ONLINE (Your Cloud)

1- Creamos manualmente una carpeta llamada "uploads" en la raíz del proyecto (no aparece inicialmente porque está en gitignore), tambien crear variables de entorno mySql, e instalar los paquetes de node. Esta carpeta alojara cada usuario y sus sub carpetas y archivos.

2- Iniciamos la DataBase en la terminal con "node db/initDb.js"

3- Iniciamos la API y el servidor con "npm run dev"

**\***COLECCIÓN DE PETICIONES A POSTMAN EN LA CARPETA PETICIONES A POSTMAN EN LA RAÍZ DEL PROYECTO

\*\*LA LISTA DE PETICIONES ES LA SIGUIENTE:

1- Crear Usuario (1 y 2)

2- Login Usuario (1 y 2)

3- Pedir Info Usuario por ID

4- Creación Carpetas Usuario (1 y 2)

5- Subida File Usuario (1 y 2)

6- Listado de Carpetas y Files

7- Static

8- Borrar Carpeta

9- Borrar File por ID de File

10- Borrar File por ID de File Usuario 2

11- Borrar Carpeta Usuario 2 con archivos en su interior (no lo va a permitir porque la carpeta tiene que estar vacía primero)

12- Borrar Carpeta Vacía Usuario 2 (va a dejar borrarla con éxito, pues no tiene archivos en su interior)

13- EXTRA: contiene una serie de peticiones erróneas con sus correspondientes mensajes.

\*\* COMENTARIOS SOBRE EL FUNCIONAMIENTO DE LA API:

Un usuario al crear su perfil en esta aplicación, desde el momento que queda registrado, automáticamente se le crea su "carpeta o raíz" desde el que puede subir archivos directamente o, por el contrario, puede crear carpetas dentro de su raíz para subir los archivos dentro de estas carpetas.

Por seguridad, un usuario no puede acceder a la información de otro usuario ni manipular, visualizar o borrar archivos quue no coincidan con su ID.
