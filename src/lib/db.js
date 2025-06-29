import mongoose from 'mongoose'
import { config } from '../../config.js'

class DatabaseConnection {
    constructor() {
        this.connection = null
    }

    async connect() {
        try {            // Configuración de opciones para MongoDB
            const options = {
                maxPoolSize: 10, // Mantener hasta 10 conexiones de socket
                serverSelectionTimeoutMS: 5000, // Mantener intentando enviar operaciones por 5 segundos
                socketTimeoutMS: 45000, // Cerrar sockets después de 45 segundos de inactividad
                family: 4 // Usar IPv4, saltar intentos de IPv6
            }

            this.connection = await mongoose.connect(config.MONGODB_URI, options)
            
            // Marcar como conectado globalmente
            global.dbConnected = true
            
            // Eventos de conexión
            mongoose.connection.on('connected', () => {
                console.log('🟢 Mongoose conectado a MongoDB')
            })

            mongoose.connection.on('error', (err) => {
                console.error('🔴 Error de conexión de Mongoose:', err)
            })

            mongoose.connection.on('disconnected', () => {
                console.log('🟡 Mongoose desconectado de MongoDB')
                global.dbConnected = false
            })

            // Manejar cierre graceful
            process.on('SIGINT', async () => {
                await this.disconnect()
                process.exit(0)
            })

            return this.connection
        } catch (error) {
            console.error('❌ Error conectando a MongoDB:', error)
            global.dbConnected = false
            throw error
        }
    }

    async disconnect() {
        try {
            if (this.connection) {
                await mongoose.connection.close()
                this.connection = null
                console.log('✅ Desconectado de MongoDB exitosamente')
            }
        } catch (error) {
            console.error('❌ Error desconectando de MongoDB:', error)
            throw error
        }
    }

    isConnected() {
        return mongoose.connection.readyState === 1
    }

    getConnection() {
        return this.connection
    }
}

// Crear una instancia única de la conexión
export const db = new DatabaseConnection()
