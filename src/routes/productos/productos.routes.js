import express from 'express'
import { crearProducto, obtenerProductos, obtenerProductosByIdOrCodigoBarrasOrNombre, buscarProductosPorNombre, actualizarProducto, eliminarProducto } from '../../useCases/productos/productos.useCases.js'

const router = express.Router()

// GET /productos/search?q=termino - Búsqueda parcial por nombre
router.get('/search', async (request, response, next) => {
    try {
        const { q } = request.query
        if (!q) {
            return response.status(400).json({
                success: false,
                message: 'Parámetro de búsqueda "q" requerido'
            })
        }
        const productos = await buscarProductosPorNombre(q)
        response.status(200).json({
            success: true,
            message: `Se encontraron ${productos.length} productos`,
            data: productos
        })
    } catch (error) {
        next(error)
    }
})

// Post /productos
router.post('/', async (request, response, next) => {
    try {
    const body = request.body
    const productos = await crearProducto(body)
    response.status(201).json( {
        success: true,
        message: 'Producto creado exitosamente',
        data: productos
    }
    )
    } catch (error) {
      next(error)
    }
})
router.get('/', async (request, response, next) => {
    try {
    const productos = await obtenerProductos()
    response.status(200).json({
        success: true,
        message: 'Productos obtenidos exitosamente',
        data: productos
    })
    } catch (error) {
      next(error)
    }
})
router.get('/:identifier', async (request, response, next) => {
    try {
    const { identifier } = request.params
    const productos = await obtenerProductosByIdOrCodigoBarrasOrNombre(identifier)
    response.status(200).json({
        success: true,
        message: 'Producto obtenido exitosamente',
        data: productos
    })
    } catch (error) {
      next(error)
    }
})
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
router.delete('/:identifier', async (request, response, next) =>{
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