# 📚 DOCUMENTACIÓN COMPLETA - VERIFICADOR DE PRECIOS

## 🛠️ **BACKEND - ARQUITECTURA Y DOCUMENTACIÓN**

### **🏗️ Estructura del Proyecto**

```
backend-verificador-precios-chila/
├── config.js                      # Configuración de base de datos
├── index.js                      # Punto de entrada principal del servidor
├── package.json                  # Dependencias y scripts del proyecto
├── poblar-bd.js                  # Script para poblar la base de datos
├── productos-ejemplo.json        # Datos de ejemplo para poblar la BD
└── src/
    ├── lib/
    │   └── db.js                 # Configuración y conexión a MongoDB
    ├── middlewares/              # Middlewares de Express (futuros)
    ├── models/
    │   ├── index.js              # Exportación centralizada de modelos
    │   └── productos/
    │       └── productos.models.js # Esquema y modelo de Mongoose para productos
    ├── routes/
    │   └── productos/
    │       └── productos.routes.js # Rutas HTTP para operaciones de productos
    └── useCases/
        └── productos/
            └── productos.useCases.js # Lógica de negocio para productos
```

---

## 🔧 **ARCHIVOS PRINCIPALES**

### **1. `index.js` - Servidor Principal**

**Propósito**: Punto de entrada de la aplicación que configura Express y arranca el servidor.

**Funcionalidades**:
- Configura middlewares básicos (CORS, JSON parsing)
- Conecta a MongoDB
- Registra rutas
- Inicia el servidor en el puerto especificado

**Flujo de ejecución**:
1. Importa dependencias y configuraciones
2. Crea instancia de Express
3. Configura middlewares
4. Conecta a la base de datos
5. Registra rutas de API
6. Inicia servidor en puerto 4000

---

### **2. `src/lib/db.js` - Conexión a Base de Datos**

**Propósito**: Maneja la conexión a MongoDB usando Mongoose.

**Funcionalidades**:
- Establece conexión con MongoDB Atlas
- Configura opciones de conexión optimizadas
- Maneja errores de conexión
- Exporta función para conectar desde otros archivos

**Características importantes**:
- URI de conexión desde variables de entorno
- Configuración de timeout y retry automático
- Logging de estado de conexión

---

### **3. `src/models/productos/productos.models.js` - Modelo de Datos**

**Propósito**: Define la estructura y validaciones de los productos en la base de datos.

**Esquema del Producto**:
```javascript
{
  nombre: String,           // Nombre del producto (requerido, único)
  precioPublico: Number,    // Precio de venta al público (requerido)
  precioCompra: Number,     // Precio de compra/costo (requerido)
  descripcion: String,      // Descripción del producto (requerido)
  codigoBarra: String,      // Código de barras (requerido, único)
  cantidad: Number,         // Stock disponible (requerido)
  createdAt: Date,         // Fecha de creación (automático)
  updatedAt: Date          // Fecha de actualización (automático)
}
```

**Validaciones implementadas**:
- Nombres únicos para evitar duplicados
- Códigos de barras únicos
- Precios deben ser números positivos
- Todos los campos son requeridos

---

### **4. `src/useCases/productos/productos.useCases.js` - Lógica de Negocio**

**Propósito**: Contiene toda la lógica de negocio para operaciones CRUD de productos.

#### **Funciones Principales**:

##### **a) `crearProducto(productoData)`**
- **Input**: Objeto con datos del producto
- **Output**: Producto creado
- **Validaciones**: Verifica que el nombre no exista
- **Error**: Lanza excepción si el producto ya existe

##### **b) `obtenerProductos()`**
- **Input**: Ninguno
- **Output**: Array con todos los productos
- **Uso**: Lista completa para inventario

##### **c) `obtenerProductosByIdOrCodigoBarrasOrNombre(identifier)`**
- **Input**: ID de MongoDB, código de barras, o nombre exacto
- **Output**: Producto encontrado
- **Lógica**: 
  1. Verifica si es ObjectId válido → busca por ID
  2. Si no es ObjectId → busca por nombre exacto
  3. Si no encuentra → busca por código de barras
- **Error**: Lanza excepción si no encuentra el producto

##### **d) `buscarProductosPorNombre(searchTerm)`** ⭐ **NUEVA FUNCIONALIDAD**
- **Input**: Término de búsqueda parcial
- **Output**: Array de productos que coincidan
- **Lógica**: Usa regex para búsqueda insensible a mayúsculas
- **Ejemplo**: "coca" encuentra "Coca Cola", "Coca Light", etc.

##### **e) `actualizarProducto(identifier, productoData)`**
- **Input**: Identificador + datos a actualizar
- **Output**: Producto actualizado
- **Lógica**: Similar a obtener, pero actualiza

##### **f) `eliminarProducto(identifier)`**
- **Input**: Identificador del producto
- **Output**: Producto eliminado
- **Lógica**: Similar a obtener, pero elimina

---

### **5. `src/routes/productos/productos.routes.js` - Rutas HTTP**

**Propósito**: Define los endpoints HTTP y conecta las rutas con la lógica de negocio.

#### **Endpoints Disponibles**:

##### **GET `/api/productos/search?q=termino`** ⭐ **NUEVO**
- **Función**: Búsqueda parcial por nombre
- **Query Params**: 
  - `q`: Término de búsqueda (requerido)
- **Response**: Lista de productos que coincidan
- **Ejemplo**: `/api/productos/search?q=coca`

##### **POST `/api/productos`**
- **Función**: Crear nuevo producto
- **Body**: JSON con datos del producto
- **Response**: Producto creado

##### **GET `/api/productos`**
- **Función**: Obtener todos los productos
- **Response**: Array con todos los productos

##### **GET `/api/productos/:identifier`**
- **Función**: Obtener producto específico
- **Params**: 
  - `identifier`: ID, código de barras, o nombre exacto
- **Response**: Producto encontrado

##### **PATCH `/api/productos/:identifier`**
- **Función**: Actualizar producto existente
- **Params**: Identificador del producto
- **Body**: JSON con campos a actualizar
- **Response**: Producto actualizado

##### **DELETE `/api/productos/:identifier`**
- **Función**: Eliminar producto
- **Params**: Identificador del producto
- **Response**: Producto eliminado

#### **Estructura de Respuesta Estándar**:
```javascript
{
  success: boolean,        // true/false
  message: string,         // Mensaje descriptivo
  data: object | array     // Datos solicitados
}
```

---

## 🛠️ **HERRAMIENTAS Y UTILIDADES**

### **`poblar-bd.js` - Script de Población de Datos**

**Propósito**: Llena la base de datos con productos de ejemplo para testing.

**Funcionalidades**:
- Lee productos desde `productos-ejemplo.json`
- Verifica conexión a base de datos
- Inserta productos evitando duplicados
- Proporciona feedback del proceso

**Uso**: `node poblar-bd.js`

### **`productos-ejemplo.json` - Datos de Prueba**

**Contenido**: Array de productos con datos realistas:
- Bebidas (Coca Cola, jugos, agua)
- Alimentos (pan, leche, snacks)
- Productos básicos con precios, códigos y stock

---

## 🔒 **MANEJO DE ERRORES**

### **Middleware de Errores**
- Captura errores de validación de Mongoose
- Maneja errores de duplicados (código 11000)
- Devuelve respuestas JSON consistentes

### **Tipos de Errores Manejados**:
1. **Validación**: Campos requeridos faltantes
2. **Duplicados**: Nombre o código de barras existente
3. **NotFound**: Producto no encontrado
4. **Database**: Errores de conexión o consulta

---

## 🚀 **CONFIGURACIÓN Y DESPLIEGUE**

### **Variables de Entorno Requeridas**:
- `MONGODB_URI`: URI de conexión a MongoDB
- `PORT`: Puerto del servidor (default: 4000)

### **Scripts Disponibles**:
- `npm start`: Inicia servidor en producción
- `npm run dev`: Inicia con nodemon para desarrollo
- `node poblar-bd.js`: Puebla la base de datos

### **Dependencias Principales**:
- **Express**: Framework web
- **Mongoose**: ODM para MongoDB
- **cors**: Manejo de CORS
- **dotenv**: Variables de entorno

---

Esta documentación del backend cubre toda la arquitectura, flujo de datos, y funcionalidades implementadas. ¿Te gustaría que continúe con la documentación del frontend?
