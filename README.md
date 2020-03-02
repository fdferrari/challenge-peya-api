# Challenge API Search PeYa
Esta API brinda los siguientes servicios:

* Integración con Public API REST PeYa.
* Almacenamiento en cache de búsquedas realizadas.

## Getting Started
Estas instrucciones le permitirá tener la aplicación funcionando en su máquina local con fines de desarrollo y pruebas.

### Prerequisities
Para ejecutar la aplicación, es necesario tener instalado en su sistema lo siguiente:
- [Node.JS](https://nodejs.org/en/) (>= v8.11.3)

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
  |        AxiosInstance.js
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
## Built With

* [Node.JS](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [Axios](https://www.npmjs.com/package/axios)

## Authors

* [Federico D. Ferrari](federico.d.ferrari@gmail.com)
