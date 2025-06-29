# 🚀 Deploy Backend en Railway

## Configuración de Variables de Entorno

### Variables requeridas en Railway:

```
PORT=4000
DB_USER=20017932
DB_PASSWORD=QdmIkw0OvNlJ0Epb
DB_HOST=cluster0.jpgruo5.mongodb.net
DB_NAME=verificador-precios-chila
JWT_SECRET=mi_jwt_secret_super_seguro_123456
JWT_EXPIRATION_TIME=24h
JWT_ALGORITHM=HS256
JWT_ISSUER=verificador-precios-api
JWT_AUDIENCE=verificador-precios-app
```

### Variables opcionales (SendGrid para emails):

```
SENDGRID_API_KEY=tu_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@tudominio.com
SENDGRID_FROM_NAME=Verificador Precios
SENDGRID_TEMPLATE_ID_NEW_CLIENT=tu_template_id
```

## 📋 Pasos para deploy en Railway:

### 1. **Conectar repositorio:**
   - Ve a [Railway.app](https://railway.app)
   - Conecta tu cuenta de GitHub
   - Selecciona este repositorio

### 2. **Configurar variables de entorno:**
   - En tu proyecto Railway, ve a la pestaña **"Variables"**
   - Agrega cada variable de entorno listada arriba
   - **IMPORTANTE:** Usa tus credenciales reales de MongoDB Atlas

### 3. **Configurar build:**
   Railway detectará automáticamente que es un proyecto Node.js
   - Build Command: `npm install`
   - Start Command: `npm start`

### 4. **Deploy:**
   - Railway hará el deploy automáticamente
   - Tu API estará disponible en: `https://tu-proyecto.railway.app`

## 🔗 Endpoints de la API:

- `GET /` - Health check
- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:identifier` - Obtener producto por ID/código/nombre
- `POST /api/productos` - Crear producto
- `PATCH /api/productos/:identifier` - Actualizar producto
- `DELETE /api/productos/:identifier` - Eliminar producto

## 🔒 Seguridad:

- El archivo `.env` está en `.gitignore` y no se subirá a GitHub
- Las variables sensibles se configuran directamente en Railway
- Railway encripta automáticamente las variables de entorno

## 🐛 Troubleshooting:

### Error de conexión a MongoDB:
1. Verifica que las credenciales sean correctas
2. Asegúrate de que MongoDB Atlas permita conexiones desde cualquier IP (0.0.0.0/0)
3. Verifica que el usuario tenga permisos de lectura/escritura

### Error de puerto:
Railway asigna automáticamente el puerto a través de la variable `PORT`

### Logs:
Revisa los logs en Railway Dashboard para depurar errores
