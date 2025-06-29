import express from 'express'
import { crearProducto, obtenerProductos, obtenerProductosByIdOrCodigoBarrasOrNombre, buscarProductosPorNombre, actualizarProducto, eliminarProducto } from '../../useCases/productos/productos.useCases.js'
import { checkDbConnection } from '../../middlewares/dbCheck.js'

const router = express.Router()

// Aplicar middleware de verificación de DB a todas las rutas
router.use(checkDbConnection)

// GET /productos - Obtener todos los productos (debe ir ANTES que las rutas con parámetros)
router.get('/', async (request, response, next) => {
    try {
        console.log('Ejecutando obtenerProductos()...')
        const productos = await obtenerProductos()
        console.log(`Se encontraron ${productos.length} productos`)
        response.status(200).json({
            success: true,
            message: 'Productos obtenidos exitosamente',
            data: productos
        })
    } catch (error) {
        console.error('Error en GET /productos:', error.message)
        next(error)
    }
})

// POST /productos - Crear nuevo producto
router.post('/', async (request, response, next) => {
    try {
        const body = request.body
        const productos = await crearProducto(body)
        response.status(201).json({
            success: true,
            message: 'Producto creado exitosamente',
            data: productos
        })
    } catch (error) {
        next(error)
    }
})

// GET /search - Buscar productos por nombre (DEBE IR ANTES DE /:identifier)
router.get('/search', async (request, response, next) => {
    try {
        const { q } = request.query
        console.log(`Buscando productos con término: "${q}"`)
        
        if (!q) {
            return response.status(400).json({
                success: false,
                message: 'Parámetro de búsqueda "q" requerido',
                data: []
            })
        }
        
        const productos = await buscarProductosPorNombre(q)
        console.log(`Se encontraron ${productos.length} productos con término "${q}"`)
        
        response.status(200).json({
            success: true,
            message: `Se encontraron ${productos.length} productos`,
            data: productos
        })
    } catch (error) {
        console.error('Error en búsqueda de productos:', error.message)
        next(error)
    }
})

// GET /productos/search - Buscar productos por nombre (compatibilidad para frontend)
router.get('/productos/search', async (request, response, next) => {
    try {
        const { q } = request.query
        console.log(`Buscando productos con término: "${q}" (compatibilidad)`)
        
        if (!q) {
            return response.status(400).json({
                success: false,
                message: 'Parámetro de búsqueda "q" requerido',
                data: []
            })
        }
        
        const productos = await buscarProductosPorNombre(q)
        console.log(`Se encontraron ${productos.length} productos con término "${q}"`)
        
        response.status(200).json({
            success: true,
            message: `Se encontraron ${productos.length} productos (compatibilidad)`,
            data: productos
        })
    } catch (error) {
        console.error('Error en búsqueda de productos (compatibilidad):', error.message)
        next(error)
    }
})

// GET /productos - Ruta de compatibilidad para frontend que usa URL incorrecta
router.get('/productos', async (request, response, next) => {
    try {
        console.log('Ejecutando obtenerProductos() desde ruta de compatibilidad /productos...')
        const productos = await obtenerProductos()
        console.log(`Se encontraron ${productos.length} productos (ruta compatibilidad)`)
        response.status(200).json({
            success: true,
            message: 'Productos obtenidos exitosamente (compatibilidad)',
            data: productos
        })
    } catch (error) {
        console.error('Error en GET /productos (compatibilidad):', error.message)
        next(error)
    }
})

// GET /productos/:identifier - Buscar producto específico (debe ir AL FINAL después de todas las rutas específicas)
router.get('/:identifier', async (request, response, next) => {
    try {
        const { identifier } = request.params
        console.log(`Buscando producto con identificador: ${identifier}`)
        const productos = await obtenerProductosByIdOrCodigoBarrasOrNombre(identifier)
        response.status(200).json({
            success: true,
            message: 'Producto obtenido exitosamente',
            data: productos
        })
    } catch (error) {
        console.error('Error buscando producto:', error.message)
        next(error)
    }
})

// PATCH /productos/:identifier - Actualizar producto
router.patch('/:identifier', async (request, response, next) => {
    try {
        const { identifier } = request.params
        const body = request.body
        const producto = await actualizarProducto(identifier, body)
        response.status(200).json({
            success: true,
            message: 'Producto actualizado exitosamente',
            data: producto
        })
    } catch (error) {
        next(error)
    }
})

// DELETE /productos/:identifier - Eliminar producto
router.delete('/:identifier', async (request, response, next) => {
    try {
        const { identifier } = request.params
        const producto = await eliminarProducto(identifier)
        response.status(200).json({
            success: true,
            message: 'Producto eliminado exitosamente',
            data: producto
        })
    } catch (error) {
        next(error)
    }
})

export const productoRoutes = router
