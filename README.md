# Challenge API Search PeYa
Esta API brinda los siguientes servicios:

* Integración con Public API REST PeYa.
* Almacenamiento en cache de búsquedas realizadas por un tiempo determinado configurable por el usuario.

# Technological Stack 

De acuerdo a la evaluación del sistema backend a desarrollar, se llega a la conclusión que la misma tiene como característica principal la recepción y envío de datos (operaciones I/O)  por sobre operaciones intensivas de CPU. Es así, que se propone construir una API REST utilizando **Node.JS** ya que esta tecnología va a permitir construir un sistema orientado a I/O, ligero, portable y fácil de escalar. A través del gestor de paquetes **NPM** (el cual viene instalado por defecto), se pueden incorporar fácilmente distintos componentes reutilizables para complementar el desarrollo. 

Por otro lado, se añade el uso del framework web **Express** para trabajar de forma ágil en el manejo del protocolo HTTP.

Como complemento se incorpora el uso de la librería **dotenv** para desacoplar del sistema todos aquellos parámetros que estén relacionados con el ambiente.

# Pending Requirements

* **Completar cobertura de tests**
* **Endpoint REST con estadísticas de uso del aplicativo**: se entiende que para cumplir este requerimiento, una opción es poder almacenar del lado del backend la sesión del usuario a traves de un session store, como Redis, para cualquier instancia distribuida. 

## Getting Started
Estas instrucciones le permitirá tener la aplicación funcionando en su máquina local con fines de desarrollo y pruebas.

### Prerequisities
Para ejecutar la aplicación, es necesario tener instalado en su sistema lo siguiente:
- [Node.JS](https://nodejs.org/en/) (>= v8.11.3)
- [NPM](https://www.npmjs.com/get-npm) (>= v5.6.0)

### API Documentation

La documentación de la api se encuentra en el directorio ./docs:

* Challenge-PeYa.postman_collection.json
* swagger-challenge.json

Los endpoints a consumir son los siguientes:

* [GET]   /api/about
* [GET]   /api/health
* [POST]  /api/login | body = {"username": "insert_username","password": "insert_password"}
* [GET]   /api/search?country=&lat=&lng= | headers = {'x-access-token':123}
* [GET]   /api/user | headers = {'x-access-token':123}
* [PUT]   /api/user | body = {"ttl": 120} | headers = {'x-access-token':123}
* [GET]   /api/logout

### Folder Structure

```
challenge-peya-api/
  ├───__tests__/
  ├───bin/
  |         www
  ├───config/
  |        winston.js
  ├───controller/
  ├───doc/
  ├───helpers/
  |        AxiosFactory.js
  ├───middlewares/
  |        auth.handler.js
  |        cookie.clear.handler.js
  |        error.handler.js
  └───services/
      .jshintrc
      app.js
      package.json
      README.md
```

## Installing
### Configuración de variables de entorno

1. Crear en el directorio raiz del proyecto un archivo `.env`
2. Establecer el valor de las siguientes variables de entorno. Por ejemplo:

`.env` :

```dosini
# Enviroment donde se despliega la aplicación
NODE_ENV = development
PORT = 5000

# Config to user session
SECRET_SESSION = catdog123

# URL API PeYa
API_PEYA = http://foobarfoo.com/public/v1/

# Config to obtain application token
CLIENT_ID = foobarfoo
CLIENT_SECRET = foobarfoo

# Default value to save request search in api
DEFAULT_TTL = 60

# URLS permitidas para cumplir la politica del mismo origen. 
CORS_URLS = http://localhost:3000
```

### Instalación de dependencias

Dentro de la carpeta del proyecto, ejecutar el siguiente comando para instalar todas las dependencias:
```
npm install
```

### Inicio de la aplicación

```
npm run start
```

### Run test

```
npm run test
```
## Built With

* [Node.JS](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [Node Cache](https://www.npmjs.com/package/node-cache)
* [Axios](https://www.npmjs.com/package/axios)

## Authors

* [Federico D. Ferrari](federico.d.ferrari@gmail.com)


This project was bootstrapped with [Express Generator](https://www.npmjs.com/package/express-generator).