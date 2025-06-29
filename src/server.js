import express from 'express'
import cors from 'cors'
import http from 'http'
import { productoRoutes } from './routes/productos/productos.routes.js'

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app) // Create HTTP server using the Express app

// Rutas
app.use('/api/productos', productoRoutes)
app.get('/', (req, res) => {
    res.status(200).json({
        api: 'Verificador de Precios API',
        version: '1.0.0',
        status: 'running',
        author: 'pedrogallegos',
        timestamp: new Date().toISOString()
    })
})

export {
    server as httpServer
}