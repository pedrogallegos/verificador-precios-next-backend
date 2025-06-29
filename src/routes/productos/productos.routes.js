import express from 'express'
import { crearProducto, obtenerProductos, obtenerProductosByIdOrCodigoBarrasOrNombre, buscarProductosPorNombre, buscarProductosPorCodigoBarra, buscarProductosInteligente, actualizarProducto, eliminarProducto } from '../../useCases/productos/productos.useCases.js'
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

// GET /search - Búsqueda inteligente (nombre o código de barras) - DEBE IR ANTES DE /:identifier
router.get('/search', async (request, response, next) => {
    try {
        const { q } = request.query
        console.log(`Búsqueda inteligente con término: "${q}"`)
        
        if (!q) {
            return response.status(400).json({
                success: false,
                message: 'Parámetro de búsqueda "q" requerido',
                data: []
            })
        }
        
        const productos = await buscarProductosInteligente(q)
        console.log(`Se encontraron ${productos.length} productos con término "${q}" (búsqueda inteligente)`)
        
        response.status(200).json({
            success: true,
            message: `Se encontraron ${productos.length} productos`,
            data: productos
        })
    } catch (error) {
        console.error('Error en búsqueda inteligente de productos:', error.message)
        next(error)
    }
})

// GET /productos/search - Búsqueda inteligente (compatibilidad para frontend)
router.get('/productos/search', async (request, response, next) => {
    try {
        const { q } = request.query
        console.log(`Búsqueda inteligente con término: "${q}" (compatibilidad)`)
        
        if (!q) {
            return response.status(400).json({
                success: false,
                message: 'Parámetro de búsqueda "q" requerido',
                data: []
            })
        }
        
        const productos = await buscarProductosInteligente(q)
        console.log(`Se encontraron ${productos.length} productos con término "${q}" (búsqueda inteligente - compatibilidad)`)
        
        response.status(200).json({
            success: true,
            message: `Se encontraron ${productos.length} productos (compatibilidad)`,
            data: productos
        })
    } catch (error) {
        console.error('Error en búsqueda inteligente de productos (compatibilidad):', error.message)
        next(error)
    }
})

// GET /search-barcode - Buscar productos por código de barras (DEBE IR ANTES DE /:identifier)
router.get('/search-barcode', async (request, response, next) => {
    try {
        const { q } = request.query
        console.log(`Buscando productos por código de barras: "${q}"`)
        
        if (!q) {
            return response.status(400).json({
                success: false,
                message: 'Parámetro de búsqueda "q" (código de barras) requerido',
                data: []
            })
        }
        
        const productos = await buscarProductosPorCodigoBarra(q)
        console.log(`Se encontraron ${productos.length} productos con código de barras "${q}"`)
        
        response.status(200).json({
            success: true,
            message: `Se encontraron ${productos.length} productos por código de barras`,
            data: productos
        })
    } catch (error) {
        console.error('Error en búsqueda por código de barras:', error.message)
        next(error)
    }
})

// GET /productos/search-barcode - Buscar productos por código de barras (compatibilidad para frontend)
router.get('/productos/search-barcode', async (request, response, next) => {
    try {
        const { q } = request.query
        console.log(`Buscando productos por código de barras: "${q}" (compatibilidad)`)
        
        if (!q) {
            return response.status(400).json({
                success: false,
                message: 'Parámetro de búsqueda "q" (código de barras) requerido',
                data: []
            })
        }
        
        const productos = await buscarProductosPorCodigoBarra(q)
        console.log(`Se encontraron ${productos.length} productos con código de barras "${q}"`)
        
        response.status(200).json({
            success: true,
            message: `Se encontraron ${productos.length} productos por código de barras (compatibilidad)`,
            data: productos
        })
    } catch (error) {
        console.error('Error en búsqueda por código de barras (compatibilidad):', error.message)
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

// PATCH /productos/:identifier - Ruta de compatibilidad para actualizar producto
router.patch('/productos/:identifier', async (request, response, next) => {
    try {
        const { identifier } = request.params
        const body = request.body
        console.log(`Actualizando producto ${identifier} (ruta compatibilidad)`)
        const producto = await actualizarProducto(identifier, body)
        response.status(200).json({
            success: true,
            message: 'Producto actualizado exitosamente (compatibilidad)',
            data: producto
        })
    } catch (error) {
        console.error('Error actualizando producto (compatibilidad):', error.message)
        next(error)
    }
})

// DELETE /productos/:identifier - Ruta de compatibilidad para eliminar producto
router.delete('/productos/:identifier', async (request, response, next) => {
    try {
        const { identifier } = request.params
        console.log(`Eliminando producto ${identifier} (ruta compatibilidad)`)
        const producto = await eliminarProducto(identifier)
        response.status(200).json({
            success: true,
            message: 'Producto eliminado exitosamente (compatibilidad)',
            data: producto
        })
    } catch (error) {
        console.error('Error eliminando producto (compatibilidad):', error.message)
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
