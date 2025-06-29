import mongoose from 'mongoose'
const { Schema } = mongoose
const productoSchema = new Schema({
    nombre: {
        type: String,
        required: true[
            'Debes ingresar un nombre para el producto'
                      ]
    },
    precioPublico : {
        type: Number,
        required: true [
            'Debes ingresar un precio para el producto'
        ],
        min: [.01, 'EL precio debe se mayor a 0']
    },
    precioCompra:{
        type: Number,
        required: true [
            'Debes ingresar un precio de compra para el producto'
        ],
        min: [.01, 'El precio de compra debe ser mayor a 0']
    },
    descripcion: {
        type: String,
        required: true ['Debes ingresar una descripcion para el producto']
    },
    codigoBarra: {
        type: String,
        trim: true
    },
    cantidad: {
        type: Number,
        required: true [
            'Debes ingresar una cantidad para el producto'
        ],
        min: [1, 'La cantidad debe ser mayor a 0']
    },
    imagen: {
        type: String,
        required: false // Campo opcional para la URL de la imagen
    }
},
{
    timestamps: true // Agrega campos createdAt y updatedAt automáticamente
})
const Producto = mongoose.model('Producto', productoSchema)
export { Producto }