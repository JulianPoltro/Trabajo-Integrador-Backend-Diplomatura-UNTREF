const express = require('express')
const app = express()
process.loadEnvFile()
const port = process.env.PORT ?? 3008
const morgan = require('morgan')
const connectDB = require('./src/database.js')
const Product = require('./src/product.js')

app.use(express.json())
app.use(morgan('dev'))
connectDB()

app.get('/', (req, res) => {
  res.send('Bienvenido a la API del SuperMarket!')
})

//Obtener todos los productos de la lista de precios
app.get('/productos', async (req, res) => {
  const { categoria } = req.query
  const query = !categoria ? {} : { genre: { $regex: categoria, $options: 'i' } }
  try {
    const productos = await Product.find(query)
    res.json(productos)
  } catch (error) {
    res.status(500).send('Error al obtener los productos de la lista de precios')
  }
})

//Obteniendo productos de la lista de precios por ID
app.get('/productos/:id', async (req, res) => {
  const { id } = req.params
  const producto = await Product.findById(id)
  if (producto) return res.json(producto)
  res.status(404).json({ message: 'Error al obtener producto por ID de la lista de precios' })
})

//Agrega un nuevo producto a la lista
app.post('/productos', async (req, res) => {
  const nuevoProducto = new Products(req.body)
  try {
    await nuevoProducto.save()
    res.status(201).json(nuevoProducto)
  } catch {
    return res.status(500).json({ message: 'Error al agregar el nuevo producto a la lista' })
  }
})


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})