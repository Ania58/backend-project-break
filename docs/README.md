En este proyecto, tienes que crear una tienda online (como un ejemplo, una tienda de ropa), con rutas específicas y, si te apetece, hacer un par de bonus.
Lo primero que tienes que hacer es crear las carpetas con sus archivos e instalar las dependencias. Ve paso a paso. Enfócate primero en las tareas obligatorias y solo cuando puedas, crea las carpetas e instala lo necesario para los bonus cuando ya tengas lo básico bien hecho.
La estructura de las carpetas es la siguiente:

.
├── config
│   ├── db.js
│   ├── firebase.js (BONUS)
│   
├── controllers
│   ├── productController.js
│   └── authController.js (BONUS)
├── models
│   └── Product.js
├── routes
│   ├── productRoutes.js
│   └── authRoutes.js (BONUS)
├── middlewares (BONUS)
│   └── authMiddleware.js
├── index.js
├── test (BONUS)
│   └── productController.test.js
├── public
│   ├── styles.css
│   └── images (OPCIONAL)
├── .env
└── package.json
Primero, crea las carpetas y los archivos obligatorios. Antes de subir cualquier cosa a GitHub, asegúrate de crear el archivo .gitignore y pon allí por lo menos .env, package-lock.json, y node-modules.
Instala las dependencias básicas:

npm install express mongoose dotenv -E
Cuando ya las tengas, monta el servidor dentro de index.js (o lo puedes llamar app.js) y requiere lo que vas a necesitar: express, dotenv.
Prueba el servidor con una ruta GET para ver si funciona.

Un ejemplo:

const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rutas (importar rutas aquí)

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
Si sabes trabajar con ramas, es recomendable trabajar con ellas y luego hacer el merge con la main.
Ahora ya puedes rellenar tus archivos. Empieza con MongoDB. Ve a la página web de Mongo Atlas y conecta tu cluster. Copia la MONGO_URI y ponla dentro del .env con tu contraseña (recuerda tener el .env en .gitignore antes de subirlo a GitHub).
Crea la conexión de datos dentro del db.js y recuerda exportarlo y luego requerirlo en tu index.js.

dbConnection();
Crea tu modelo de los productos. Recuerda los campos que necesitas, por ejemplo: nombre, descripción, imagen, categoría, talla, precio.
Puedes hacerlo parecido a este:

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  size: { type: Number, required: true },
  price: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model('Product', productSchema);
Crea las siguientes rutas:

GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
GET /products/:productId: Devuelve el detalle de un producto.
GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clicamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
POST /dashboard: Crea un nuevo producto.
GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
PUT /dashboard/:productId: Actualiza un producto.
DELETE /dashboard/:productId/delete: Elimina un producto.
Si aún no te sientes cómodo con los controladores, crea las rutas y mete la lógica dentro. Luego separa tu lógica entre las rutas y los controladores. Empieza creando un par de productos en Postman y ve si se han creado correctamente en MongoDB Atlas. Ve probando, modificando y eliminando los productos en Postman para asegurarte de que todo funciona.

Convierte las rutas en funciones dentro del controlador. Las funciones son las siguientes: showProducts, showProductById, showNewProduct, createProduct, showEditProduct, updateProduct, deleteProduct. Usa las funciones correctas dentro de las rutas, por ejemplo:

router.get('/', productController.showProducts);
Cuando veas que los productos están bien creados y todas las rutas funcionan, intenta mejorar el aspecto visual con CSS.
Recuerda añadir el CSS en el link de tu HTML que usas en las funciones, y lo siguiente dentro de index.js:


app.use(express.static(path.join(__dirname, 'public')));
Firebase
Crea una cuenta en Firebase y elige la autenticación por correo y contraseña.
Vuelve al proyecto e instala lo siguiente:


npm install cookie-parser firebase firebase-admin -E
Dentro de la carpeta public, crea una carpeta utils con un archivo configLogin.js y otra carpeta views con archivos login.html y register.html. En configLogin.js, mete la configuración que proporciona Firebase al registrar tu aplicación.

En tu cuenta de Firebase, ve a Configuración de proyecto --> Cuentas de servicios --> Generar una clave privada. Cuando se descargue, métela dentro del .env, pero modifícala: elimina {}, comas y comillas. Pon las variables del entorno en mayúsculas y cambia los : por = (por ejemplo, FIREBASE_TYPE="service_account").
Una vez terminado, encripta las variables y mételas dentro del archivo firebase.js.

Tienes que requerir todo lo necesario de Firebase en index.js. Para evitar problemas, recuerda poner:

admin.initializeApp({
  credential: admin.credential.cert(firebase),
});
antes de requerir y usar las rutas. También, requiere lo siguiente:

const path = require('path');
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');
const firebase = require('./config/firebase');
y usa:

app.use(cookieParser());
Configura el login dentro de configLogin.js y recuerda inicializar Firebase con:

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
Crea un archivo de middleware que verifica el token. Luego crea un controlador con las funciones del registro y login. Recuerda destruir la sesión con la función de logout. Crea las rutas correctas e incluye las funciones dentro (por ejemplo, router.get('/', authController.redirectToLogin);).

Recuerda crear los formularios de registro y login en los archivos login.html y register.html.

Para usar Swagger, recuerda instalarlo:


npm install swagger-ui-express -E
Luego, requiérelo en index.js:

j
const swaggerUi = require('swagger-ui-express');
Y úsalo dentro del código para generar la interfaz de la documentación de tu API:

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
Crear la carpeta de documentación
Crea una carpeta llamada docs con los siguientes archivos:


docs
│   ├── basicInfo.js
│   ├── components.js
│   ├── index.js
│   └── products.js
1. basicInfo.js:
Aquí defines la información básica de tu API, como el nombre del proyecto, la versión, y una breve descripción. Un ejemplo podría verse así:


module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'API Tienda de Ropa',
    version: '1.0.0',
    description: 'Documentación de la API para gestionar productos en una tienda de ropa.',
  },
};
2. components.js:
Define aquí los schemas que utilizarás en tu API. Estos son componentes reutilizables para definir cómo luce cada modelo, por ejemplo, el esquema de productos:


module.exports = {
  components: {
    schemas: {
      Product: {
        type: 'object',
        required: ['name', 'description', 'image', 'category', 'size', 'price'],
        properties: {
          name: {
            type: 'string',
            description: 'Nombre del producto',
          },
          description: {
            type: 'string',
            description: 'Descripción del producto',
          },
          image: {
            type: 'string',
            description: 'URL de la imagen del producto',
          },
          category: {
            type: 'string',
            description: 'Categoría del producto',
          },
          size: {
            type: 'number',
            description: 'Tamaño o talla del producto',
          },
          price: {
            type: 'number',
            description: 'Precio del producto',
            minimum: 0,
          },
        },
      },
    },
  },
};
3. products.js:
Documenta las rutas correspondientes a los productos. Aquí puedes describir qué hace cada función y las respuestas esperadas. Un ejemplo para la ruta que obtiene todos los productos sería:


module.exports = {
  paths: {
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'Devuelve todos los productos',
        responses: {
          200: {
            description: 'Lista de productos devuelta exitosamente',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Product',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
4. index.js (dentro de la carpeta docs):
Aquí es donde combinas todos los archivos de documentación para exportarlos juntos. Un ejemplo de cómo hacerlo es:


const basicInfo = require('./basicInfo');
const components = require('./components');
const products = require('./products');

module.exports = {
  ...basicInfo,
  ...components,
  ...products,
};
Último paso
Recuerda requerir todo en index.js principal de tu aplicación:


const docs = require('./docs/index');
Esto asegura que Swagger muestre toda la documentación al acceder a la ruta /api-docs en tu servidor.


Para hacer el testing, recuerda empezar con:


npm install jest -dev -E
Haz el testing de tus funciones de controladores. Si usas Supertest para hacer peticiones en tus pruebas, asegúrate de instalarlo:


npm install --save-dev supertest
Prueba cada ruta que creaste antes para asegurarte de que los controladores funcionan correctamente, incluyendo las de creación, modificación, y eliminación de productos. Por ejemplo, en el test de la ruta GET /products, verifica que todos los productos se obtienen correctamente y que los detalles de un producto específico se muestran con GET /products/
.

Crea un archivo de prueba para cada controlador, como:


test/productController.test.js
Allí, define varios casos de prueba, usando Jest y Supertest para asegurarte de que todas las funcionalidades se comportan según lo esperado. Para un ejemplo básico:


const request = require('supertest');

describe('GET /products', () => {
  it('debería devolver todos los productos', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('products');
  });
});
Cuando hayas terminado tus pruebas, ejecuta Jest con:

npm test