// Ejemplo de uso de la API con los nuevos campos
// Ejecuta este archivo después de poblar la base de datos para probar la API

console.log('🧪 Ejemplos de uso de la API de productos\n')

console.log('📝 CREAR PRODUCTO (POST /api/productos):')
console.log('curl -X POST http://localhost:4000/api/productos \\')
console.log('  -H "Content-Type: application/json" \\')
console.log('  -d \'{')
console.log('    "nombre": "Refresco de Tamarindo",')
console.log('    "precioPublico": 1.75,')
console.log('    "precioCompra": 1.25,')
console.log('    "descripcion": "Refresco sabor tamarindo 355ml",')
console.log('    "codigoBarra": "7501055999999",')
console.log('    "cantidad": 50')
console.log('  }\'\n')

console.log('📖 OBTENER TODOS LOS PRODUCTOS (GET /api/productos):')
console.log('curl http://localhost:4000/api/productos\n')

console.log('🔍 BUSCAR PRODUCTO POR CÓDIGO DE BARRAS (GET /api/productos/:identifier):')
console.log('curl http://localhost:4000/api/productos/7501055362011\n')

console.log('🔍 BUSCAR PRODUCTO POR NOMBRE (GET /api/productos/:identifier):')
console.log('curl http://localhost:4000/api/productos/Coca%20Cola%20600ml\n')

console.log('✏️ ACTUALIZAR PRODUCTO (PATCH /api/productos/:identifier):')
console.log('curl -X PATCH http://localhost:4000/api/productos/7501055362011 \\')
console.log('  -H "Content-Type: application/json" \\')
console.log('  -d \'{')
console.log('    "precioPublico": 2.75,')
console.log('    "precioCompra": 1.95,')
console.log('    "cantidad": 200')
console.log('  }\'\n')

console.log('🗑️ ELIMINAR PRODUCTO (DELETE /api/productos/:identifier):')
console.log('curl -X DELETE http://localhost:4000/api/productos/7501055362011\n')

console.log('💡 RESPUESTA TÍPICA:')
console.log('{')
console.log('  "success": true,')
console.log('  "message": "Producto obtenido exitosamente",')
console.log('  "data": {')
console.log('    "_id": "64a5f8b9c123456789abcdef",')
console.log('    "nombre": "Coca Cola 600ml",')
console.log('    "precioPublico": 2.50,')
console.log('    "precioCompra": 1.80,')
console.log('    "descripcion": "Bebida gaseosa sabor cola en botella de 600ml",')
console.log('    "codigoBarra": "7501055362011",')
console.log('    "cantidad": 150,')
console.log('    "createdAt": "2024-01-01T00:00:00.000Z",')
console.log('    "updatedAt": "2024-01-01T00:00:00.000Z"')
console.log('  }')
console.log('}\n')

console.log('🎯 Campo nuevo agregado:')
console.log('• precioPublico: Precio de venta al público')
console.log('• precioCompra: Precio de compra/costo del producto')
console.log('• Margen de ganancia = ((precioPublico - precioCompra) / precioCompra) * 100')
