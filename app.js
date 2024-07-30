const express = require("express");
const app = express();
process.loadEnvFile();
const port = process.env.PORT ?? 3008;
const morgan = require("morgan");
const connectDB = require("./src/database.js");
const Product = require("./src/product.js");

app.use(express.json());
app.use(morgan("dev"));
connectDB();

app.get("/", (req, res) => {
  res.send("Bienvenido a la API del SuperMarket!");
});

//Obtener todos los productos de la lista de precios
app.get("/productos", async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res
      .status(500)
      .send("Error al obtener los productos de la lista de precios");
  }
});

//Obteniendo productos de la lista de precios por ID
app.get("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const producto = await Product.findById(id);
  if (producto) return res.json(producto);
  res
    .status(404)
    .json({ message: "ID del producto no encontrado de la lista de precios" });
});

//Agrega un nuevo producto a la lista
app.post("/productos", async (req, res) => {
  const nuevoProducto = new Product(req.body);
  try {
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch {
    return res
      .status(500)
      .json({ message: "Error al agregar el nuevo producto a la lista" });
  }
});

//Borrar un producto existente por ID
app.delete("/prodcutos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Product.findByIdAndDelete(id);
    if (producto) {
      res.json({ message: "Producto eliminado" });
    } else {
      res.status(404).json({ message: "Producto no encontrado para eliminar" });
    }
  } catch (error) {
    return res.status(500).send("Error al eliminar el prodcuto");
  }
});

//Modificar un producto de la lista por si ID
app.put("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productoActualizado = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!productoActualizado) {
      return res
        .status(404)
        .json({ message: "Producto a modificar no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al modificar el producto" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
