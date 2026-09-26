# Stock Manager

Aplicación web para la gestión y control de insumos. Permite consultar el stock disponible, filtrar productos, editar información y actualizar cantidades desde una interfaz web.

El proyecto fue desarrollado como una práctica full-stack para trabajar con **React, TypeScript, Node.js, Express y MySQL**, aplicando una arquitectura separada entre frontend y backend.

## Tecnologías utilizadas

### Frontend

* React
* TypeScript
* Vite
* CSS
* Fetch API

### Backend

* Node.js
* Express
* TypeScript
* MySQL
* mysql2
* Multer
* dotenv
* CORS

## Funcionalidades

* Listado de insumos.
* Visualización de información de cada producto.
* Filtrado por nombre y categoría.
* Consulta de categorías disponibles.
* Actualización de cantidades.
* Edición de información de los insumos.
* Validación de datos en el backend.
* Persistencia de información mediante MySQL.
* Carga de imágenes mediante Multer.
* API REST desarrollada con Express.
* Comunicación entre frontend y backend mediante HTTP.

## Estructura del proyecto

```text
stock_manager/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── types/
│   │   └── app.ts
│   │
│   ├── uploads/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── README.md
```

## Requisitos

Para ejecutar el proyecto localmente se necesita:

* Node.js
* npm
* MySQL
* Git

## API

El backend expone una API REST para trabajar con los insumos.

Entre las operaciones disponibles se encuentran:

| Método | Endpoint                | Descripción               |
| ------ | ----------------------- | ------------------------- |
| GET    | `/api/supplies`         | Obtener todos los insumos |
| GET    | `/api/supply/:id`       | Obtener un insumo por ID  |
| GET    | `/api/categories`       | Obtener las categorías    |
| POST   | `/api/createSupply`     | Crear un insumo           |
| PATCH  | `/api/updateAmount/:id` | Actualizar la cantidad    |
| PATCH  | `/api/updateSupply/:id` | Actualizar un insumo      |


## Base de datos

El proyecto utiliza MySQL para almacenar la información de los insumos.

La conexión se realiza mediante `mysql2` y las credenciales se configuran mediante variables de entorno.

## Validación

La aplicación realiza validaciones tanto en el frontend como en el backend.

Entre ellas:

* Campos obligatorios.
* Cantidades enteras.
* Cantidades mayores o iguales a cero.
* Validación de identificadores recibidos mediante parámetros.
* Validación de variables de entorno necesarias para la conexión a la base de datos.
* Validación de archivos de imagen mediante Multer.
