# Expositor de productos con autenticación Node.js + React

Este proyecto es un **expositor de productos** de acceso público que no necesita registro para ser consultado. Con capacidad para registrarse e iniciar sesión para poder publicar y editar productos propios.
Para llevar a cabo esta tarea se ha conectado una base de datos, gestionada a través del back-end (este repositorio) y una sección front-end [https://github.com/VonCarlosB/Final_project_front](https://github.com/VonCarlosB/Final_project_front)

---

## Tecnologías usadas

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- Body-parser
- Bcrypt.js
- JSON Web Token (JWT)
- dotenv
- CORS
- Cloudinary
- Multer
- Multer-storage-cloudinary

### Frontend

[https://github.com/VonCarlosB/Final_project_front](https://github.com/VonCarlosB/Final_project_front)

---

## Funcionalidades

- Registro de usuario con nombre y contraseña
- Inicio de sesión seguro con token JWT
- CRUD de usuarios
    - Crear usuarios mediante nombre y contraseña
    - Leer usuarios a través del nombre
    - Actualizar usuarios a través del ID
    - Eliminar usuarios a través del ID
- CRUD de productos
    - Crear productos de forma segura vinculados a un nombre de usuario
    - Leer productos a través del nombre de usuario, del nombre del producto o del ID
    - Actualizar productos a través de su ID
    - Eliminar productos a través de su ID
- Cada usuario puede crear nuevos productos y editar los suyos
- Middleware de autenticación con JWT

## Organización del código

<pre>
├── config/           ← Conexión a MongoDB
├── controllers/      ← Lógica de autenticación, gestión de usuarios y productos
├── middlewares/      ← Middleware de protección con JWT
├── models/           ← Esquemas de usuario y productos
├── routes/           ← Rutas protegidas de auth y productos
├── utils/            ← Configuración de cloudinary
├── .env              ← Variables de entorno
└── index.js          ← Inicio de la app
</pre>

El archivo `.env` tendrá las siguientes variables de entorno:

- PORT = 3000  `Puerto`
- MONGO_URI = 'mongodb+srv://<usuario>:<clave>@cluster.mongodb.net/nombreDB' `URL de mongo`
- CLOUDINARY_NAME `Nombre del servicio Cloudinary`
- CLOUDINARY_API_KEY `Clave de la base de datos de Cloudinary`
- CLUDINARY_SECRET `Secreto de la cuenta de Cloudinary`
- JWT_SECRET `Clave secreta que se usa para firmar y verificar los tokens JWT.`

JWT_SECRET debe ser una cadena larga y compleja de 32 caracteres mínimo incluyendo, mayúsculas, minúsculas, símbolos y números.

## Rutas disponibles

### Usuarios (/routes/userRoutes)

- GET /users : Para obtener todos los usuarios.
- GET /users/:userName : Para obtener al usuario con nombre :userName.
- POST /users/create : Para crear un nuevo usuario con un nuevo nombre.
- POST /users/login : Para iniciar sesión, devolviendo un token JWT.
- PUT /users/:userId : Para modificar la información de un usuario existente. (Requiere autenticación)
- DELETE /users/:userId : Para eliminar el usuario y sus productos. (No tiene acceso desde el frontend)

### Productos (/routes/productRoutes)

- GET /products : Para obtener todos los productos.
- GET /products/user/:user : Para obtener todos los productos del usuario con nombre :user.
- GET /products/id/:productId : Para obtener un producto con el ID :productId.
- GET /products/name/:productName : Para obtener todos los productos con parte de nombre :productName.
- POST /products/create : Para crear un producto con propietario, nombre, descripción, imagen y precio. (Requiere autenticación)
- PUT /products/:productId : Para actualizar un producto existente. (Requiere autenticación)
- DELETE /products/:productId : Para eliminar un producto existente. (Requiere autenticación)

## Despliegue

El uso de este código requiere tener Node.js instalado así como una cuenta en Cloudinary y MongoDB.

Para utilizar el código de este proyecto deberá descargarse en una carpeta y comenzar ejecutando el comando `npm i` para instalar las dependencias de los paquetes de Node.

A continuación se debe crear un archivo .env donde se deben colocar las variables de entorno expuestas previamente.

Por último se ejecutará el comando `npm start` que ejecutará el servicio en local en el puerto establecido en la variable PORT.