/**
 * ============================================
 * PRODUCTOS USE CASES - LÓGICA DE NEGOCIO
 * ============================================
 * 
 * Este archivo contiene toda la lógica de negocio para las operaciones CRUD 
 * de productos. Cada función maneja una operación específica y valida los 
 * datos antes de interactuar con la base de datos.
 * 
 * Funciones principales:
 * - crearProducto: Crea un nuevo producto
 * - obtenerProductos: Obtiene todos los productos
 * - obtenerProductosByIdOrCodigoBarrasOrNombre: Busca producto específico
 * - buscarProductosPorNombre: Búsqueda parcial por nombre (NUEVA)
 * - actualizarProducto: Actualiza producto existente
 * - eliminarProducto: Elimina producto
 */

import { isValidObjectId } from 'mongoose'
import { Producto } from '../../models/index.js'

/**
 * CREAR PRODUCTO
 * 
 * Crea un nuevo producto en la base de datos después de validar que 
 * no exista otro producto con el mismo nombre.
 * 
 * @param {Object} productoData - Datos del producto a crear
 * @param {string} productoData.nombre - Nombre único del producto
 * @param {number} productoData.precioPublico - Precio de venta al público
 * @param {number} productoData.precioCompra - Precio de compra/costo
 * @param {string} productoData.descripcion - Descripción del producto
 * @param {string} productoData.codigoBarra - Código de barras único
 * @param {number} productoData.cantidad - Stock inicial
 * 
 * @returns {Promise<Object>} Producto creado con _id generado
 * @throws {Error} Si ya existe un producto con el mismo nombre
 */
async function crearProducto (productoData) {
    // Extraer nombre para validación de duplicados
    const nombre = productoData.nombre
    
    // Verificar si ya existe un producto con este nombre
    const existingProduct = await Producto.findOne({nombre})
    if (existingProduct) {
        throw new Error('El producto ya existe')
    }
    
    // Crear el nuevo producto en la base de datos
    const newProducto = await Producto.create(productoData)
    return newProducto
}

/**
 * OBTENER TODOS LOS PRODUCTOS
 * 
 * Recupera la lista completa de productos de la base de datos.
 * Útil para mostrar el inventario completo.
 * 
 * @returns {Promise<Array>} Array con todos los productos
 */
async function obtenerProductos () {
    const productos = await Producto.find({})
    return productos
}

/**
 * OBTENER PRODUCTO POR ID, CÓDIGO DE BARRAS O NOMBRE EXACTO
 * 
 * Función versátil que puede buscar un producto usando diferentes criterios:
 * 1. Si el identificador es un ObjectId válido → busca por _id
 * 2. Si no es ObjectId → busca por nombre exacto
 * 3. Si no encuentra por nombre → busca por código de barras
 * 
 * @param {string} identifier - Puede ser: ObjectId, nombre exacto, o código de barras
 * @returns {Promise<Object>} Producto encontrado
 * @throws {Error} Si no se encuentra el producto
 */
async function obtenerProductosByIdOrCodigoBarrasOrNombre (identifier) {
    // Verificar si el identificador es un ObjectId válido de MongoDB
    const isObjectId = isValidObjectId(identifier)
    let producto
    
    if(isObjectId) {
        // Si es ObjectId, buscar directamente por _id
        producto = await Producto.findById(identifier)
    } else {
        // Si no es ObjectId, intentar búsqueda por nombre exacto
        producto = await Producto.findOne({nombre: identifier})
        
        if (!producto) {
            // Si no se encuentra por nombre, buscar por código de barras
            producto = await Producto.findOne({codigoBarra: identifier})
        }
    }
    
    // Si no se encontró el producto por ningún criterio, lanzar error
    if (!producto) {
        throw new Error('Producto no encontrado')
    }
    
    return producto
}

// Buscar productos por nombre (búsqueda parcial)
async function buscarProductosPorNombre(searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        throw new Error('Término de búsqueda requerido')
    }
    
    // Búsqueda insensible a mayúsculas y minúsculas, que contenga el término
    const productos = await Producto.find({
        nombre: { $regex: searchTerm.trim(), $options: 'i' }
    })
    
    return productos
}

/**
 * BUSCAR PRODUCTOS POR CÓDIGO DE BARRAS
 * 
 * Busca productos que contengan el código de barras proporcionado.
 * Útil para buscar productos escaneando códigos de barras.
 * 
 * @param {string} codigoBarra - Código de barras o parte del código a buscar
 * @returns {Promise<Array>} Array con productos que coincidan con el código de barras
 * @throws {Error} Si no se proporciona un código de barras
 */
async function buscarProductosPorCodigoBarra(codigoBarra) {
    if (!codigoBarra || codigoBarra.trim() === '') {
        throw new Error('Código de barras requerido')
    }
    
    // Búsqueda exacta por código de barras
    const productos = await Producto.find({
        codigoBarra: { $regex: codigoBarra.trim(), $options: 'i' }
    })
    
    return productos
}

// Actualizar un producto por ID

async function actualizarProducto (identifier, productoData) {
    const isObjectId = isValidObjectId(identifier)
    let updatedProducto
    if(isObjectId) {
        updatedProducto = await Producto.findByIdAndUpdate(identifier, productoData, {new: true})
    } else {
        // Primero buscar por nombre
        updatedProducto = await Producto.findOneAndUpdate({nombre: identifier}, productoData, {new: true})
        if (!updatedProducto) {
            // Si no se encuentra por nombre, buscar por código de barras
            updatedProducto = await Producto.findOneAndUpdate({codigoBarra: identifier}, productoData, {new: true})
        }
    }
    if(!updatedProducto) {
        throw new Error('Producto no encontrado')
    }
    return updatedProducto
}

// Eliminar un producto por ID, nombre o codigo de barras

async function eliminarProducto (identifier) {
    const isObjectId = isValidObjectId(identifier)
    let deletedProducto
    if (isObjectId) {
        deletedProducto = await Producto.findByIdAndDelete(identifier)
    } else {
        // Primero buscar por nombre
        deletedProducto = await Producto.findOneAndDelete({nombre: identifier})
        if (!deletedProducto) {
            // Si no se encuentra por nombre, buscar por código de barras
            deletedProducto = await Producto.findOneAndDelete({codigoBarra: identifier})
        }
    }
    if (!deletedProducto) {
        throw new Error('Producto no encontrado')
    }
    return deletedProducto
}

export {
    crearProducto,
    obtenerProductos,
    obtenerProductosByIdOrCodigoBarrasOrNombre,
    buscarProductosPorNombre,
    buscarProductosPorCodigoBarra,
    actualizarProducto,
    eliminarProducto
}