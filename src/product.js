const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
    codigo: { type: Number, required: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: { type: String, required: true }

})

const Product = mongoose.model('products', productSchema)

module.exports = Product