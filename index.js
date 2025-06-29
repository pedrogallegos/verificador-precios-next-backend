import { httpServer } from './src/server.js'
import { db } from './src/lib/db.js'

async function start(){
    // Conectar a la base de datos
    try {
        await db.connect()
        console.log('✅ Conexión a la base de datos exitosa')
        
        // Iniciar el servidor
        const PORT = parseInt(process.env.PORT) || 4000
        const HOST = process.env.HOST || '0.0.0.0'
        
        await new Promise((resolve) => httpServer.listen(PORT, HOST, resolve))
        console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`)
        return { server: httpServer, port: PORT }
    }
    catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error)
        await db.disconnect().catch(console.error)
        process.exit(1)
    }
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