# DiscoDuroHAB
Second Project of the Bootcamp of Programming and coding in Spain.


***INSTRUCCIONES DE FUNCIONAMIENTO DE LA API:


1- CREACIÓN DE NUEVO USUARIO:

   En Postman poner la dirección http con terminación /users y hacer petición de tipo POST completando los datos del siguiente JSON:

   "user_name": "Carlos Sainz",
   "email": "intentandoarrancardesde1998@gmail.com",
   "password": "loremipsum"

   (ES UN EJEMPLO) Con esto debería crear un usuario y generar su ID


2- LOGIN DE USUARIO REGISTRADO:

    En Postman poner la dirección http con terminación /login y hacer petición de tipo POST completando los datos del siguiente JSON:

    "email": "anonimo@gmail.com",
    "password": "loremipsum"

    (ES UN EJEMPLO) Esto hará que el usuario ingrese en la app y devolverá un TOKEN firmado por ese ID que permitirá hacer ciertas gestiones
    reservadas exclusivamente a usuarios registrados, como crear y borrar archivos y carpetas.

3- CREACIÓN DE CARPETAS:

   En Postman, en la raíz, hacer petición de tipo POST pero, antes, en headers poner AUTHORIZATION y en KEY pegar el TOKEN (sin comillas) del
   usuario logueado. Una vez hecho esto, vamos a body y completamos el siguiente JSON:

   "folderName": "Imágenes"

   (ES UN EJEMPLO) Esto hará que el usuario logueado haya creado una carpeta asociada a su ID y, además, habrá generado un ID propio para dicha carpeta
   asociado también al ID del usuario.

4- BORRAR CARPETAS:

   En Postman, en la ruta /folder/:id, hacer una petición de tipo DELETE con el usuario interesado en borrar dicha carpeta. En la ruta, tendrá que poner
   el ID asociado a la carpeta, no al usuario y si el ID del usuario corresponde al del que creó la carpeta, la carpeta será borrada, en caso contrario
   saldrá un mensaje que avisa de que se está intentando borrar una carpeta que no está asociada a ese ID.

   Hay que diferenciar entre user_id y el id de la carpeta. El id de la carpeta está asociado directamente al Id de usuario, al mismo tiempo, cada carpeta 
   posee un ID propio.

