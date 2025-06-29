// Script para verificar que las variables de entorno estén configuradas correctamente
import { config } from './config.js'

console.log('🔍 Verificando configuración de variables de entorno...\n')

console.log('📡 Configuración del servidor:')
console.log(`PORT: ${config.PORT}`)
console.log('')

console.log('🗄️ Configuración de base de datos:')
console.log(`MONGODB_URI: ${config.MONGODB_URI ? '✅ Configurada' : '❌ No configurada'}`)
if (config.MONGODB_URI) {
    // Mostrar URI sin password por seguridad
    const safeUri = config.MONGODB_URI.replace(/:([^:@]{8})[^:@]*@/, ':****@')
    console.log(`URI (segura): ${safeUri}`)
}
console.log('')

console.log('🔐 Configuración JWT:')
console.log(`JWT_SECRET: ${config.JWT_SECRET ? '✅ Configurada' : '❌ No configurada'}`)
console.log(`JWT_EXPIRATION_TIME: ${config.JWT_EXPIRATION_TIME || 'No configurada'}`)
console.log(`JWT_ALGORITHM: ${config.JWT_ALGORITHM || 'No configurada'}`)
console.log('')

console.log('📧 Configuración SendGrid (opcional):')
console.log(`SENDGRID_API_KEY: ${config.SENDGRID_API_KEY ? '✅ Configurada' : '⚠️ No configurada'}`)
console.log(`SENDGRID_FROM_EMAIL: ${config.SENDGRID_FROM_EMAIL || 'No configurada'}`)
console.log('')

console.log('🎯 Variables de entorno para Railway:')
console.log('Copia estas variables en Railway Dashboard > Variables:')
console.log('')
console.log('DB_USER=20017932')
console.log('DB_PASSWORD=QdmIkw0OvNlJ0Epb')
console.log('DB_HOST=cluster0.jpgruo5.mongodb.net')
console.log('DB_NAME=verificador-precios-chila')
console.log('JWT_SECRET=mi_jwt_secret_super_seguro_123456')
console.log('JWT_EXPIRATION_TIME=24h')
console.log('JWT_ALGORITHM=HS256')
console.log('JWT_ISSUER=verificador-precios-api')
console.log('JWT_AUDIENCE=verificador-precios-app')
console.log('')
console.log('💡 Nota: En Railway, no necesitas configurar PORT, se asigna automáticamente.')
