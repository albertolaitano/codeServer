# README SPRINT3

# USER

- Este código es un servidor Express que implementa una API RESTful para gestionar usuarios. Utiliza el puerto 8080 para escuchar las solicitudes entrantes. Cuando el servidor está en funcionamiento, puede manejar solicitudes GET en tres rutas principales:

- Ruta Raíz ("/"): Esta ruta devuelve un mensaje JSON indicando que la API está lista para su uso. No realiza ninguna operación de lectura o escritura en la base de datos de usuarios.

- Ruta "/api/users" (GET): Esta ruta permite recuperar todos los usuarios almacenados en la base de datos o filtrarlos según un rol específico. Utiliza el método usersManager.read(role) para obtener los usuarios y los devuelve como respuesta JSON.

- Ruta "/api/users/:nid" (GET): Esta ruta permite recuperar la información de un usuario específico según su ID. Utiliza el método usersManager.readOne(nid) para obtener el usuario y lo devuelve como respuesta JSON.

- Para probar el código, puedes iniciar el servidor ejecutando el archivo con Node.js (node server.js) y luego acceder a las rutas especificadas en tu navegador web. Por ejemplo, puedes ingresar a "http://localhost:8080/api/users" para obtener todos los usuarios o a "http://localhost:8080/api/users/1" para obtener el usuario con ID 1.

# PRODUCT

- Este código es un servidor Express que implementa una API RESTful para gestionar productos. Utiliza el puerto 8080 para escuchar las solicitudes entrantes. Cuando el servidor está en funcionamiento, puede manejar solicitudes GET en tres rutas principales:

- Ruta Raíz ("/"): Esta ruta devuelve un mensaje JSON indicando que la API está lista para su uso. No realiza ninguna operación de lectura o escritura en la base de datos de productos.

- Ruta "/api/products" (GET): Esta ruta permite recuperar todos los productos almacenados en la base de datos o filtrarlos según la categoria. Utiliza el método productManager.read(cat) para obtener los usuarios y los devuelve como respuesta JSON.

- Ruta "/api/products/:nid" (GET): Esta ruta permite recuperar la información de un usuario específico según su ID. Utiliza el método usersManager.readOne(nid) para obtener el usuario y lo devuelve como respuesta JSON.

- Para probar el código, puedes iniciar el servidor ejecutando el archivo con Node.js (node server.js) y luego acceder a las rutas especificadas en tu navegador web. Por ejemplo, puedes ingresar a "http://localhost:8080/api/users" para obtener todos los usuarios o a "http://localhost:8080/api/users/1" para obtener el usuario con ID 1.
