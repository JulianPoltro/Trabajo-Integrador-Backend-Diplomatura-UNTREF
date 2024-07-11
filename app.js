const express = require('express')
const app = express()
process.loadEnvFile()
const port = process.env.PORT ?? 3008
const morgan = require('morgan')
const connectDB = require('./src/database.js')

app.use(express.json())
app.use(morgan('dev'))
connectDB()


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})