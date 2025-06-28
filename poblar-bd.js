import fs from 'fs/promises'
import { db } from './src/lib/db.js'
import { Producto } from './src/models/index.js'

async function poblarBaseDatos() {
    try {
        // Conectar a la base de datos
        console.log('🔌 Conectando a la base de datos...')
        await db.connect()
        console.log('✅ Conectado a MongoDB')

        // Leer el archivo JSON
        console.log('📖 Leyendo archivo de productos...')
        const productosData = await fs.readFile('./productos-ejemplo.json', 'utf-8')
        const productos = JSON.parse(productosData)

        // Limpiar la colección existente (opcional)
        console.log('🧹 Limpiando productos existentes...')
        await Producto.deleteMany({})        // Insertar productos
        console.log('📦 Insertando productos...')
        const productosInsertados = await Producto.insertMany(productos)
        
        console.log(`✅ ${productosInsertados.length} productos insertados exitosamente`)
        
        // Mostrar algunos productos insertados
        console.log('\n📋 Productos insertados:')
        productosInsertados.slice(0, 5).forEach((producto, index) => {
            console.log(`${index + 1}. ${producto.nombre} - Público: $${producto.precioPublico} - Compra: $${producto.precioCompra}`)
        })
        
        if (productosInsertados.length > 5) {
            console.log(`... y ${productosInsertados.length - 5} productos más`)
        }

    } catch (error) {
        console.error('❌ Error poblando la base de datos:', error)
    } finally {
        // Desconectar
        await db.disconnect()
        console.log('🔌 Desconectado de la base de datos')
        process.exit(0)
    }
}

// Ejecutar el script
poblarBaseDatos()
