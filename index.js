import { httpServer } from './src/server.js'
import { db } from './src/lib/db.js'

// Inicializar estado de la base de datos
global.dbConnected = false

async function start(){
    // Iniciar el servidor PRIMERO (para que Railway pueda hacer healthcheck)
    const PORT = parseInt(process.env.PORT) || 4000
    const HOST = process.env.HOST || '0.0.0.0'
    
    await new Promise((resolve) => httpServer.listen(PORT, HOST, resolve))
    console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`)
    
    // DESPUÉS conectar a la base de datos (en background)
    try {
        console.log('🔌 Intentando conectar a la base de datos...')
        await db.connect()
        console.log('✅ Conexión a la base de datos exitosa')
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error)
        console.log('⚠️ El servidor seguirá funcionando sin base de datos')
        // NO salir del proceso - el servidor debe seguir corriendo para Railway
    }
    
    return { server: httpServer, port: PORT }
}

async function shutdown (signal) {
      console.log(`\n${signal} recibido, apagándose elegantemente...`)
      try {
        await db.disconnect()
        console.log('✅ Desconexión de la base de datos exitosa')
        process.exit(0)
      } catch (error) {
        console.error('❌ Error al desconectar la base de datos:', error)
        process.exit(1)
      }
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

// Iniciar la aplicación
start().catch((error) => {
    console.error('❌ Error al iniciar la aplicación:', error)
    process.exit(1)
})