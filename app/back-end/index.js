import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import plantsRouter from './routes/plants.js'
import genusRouter from './routes/genus.js'
import contactRouter from './routes/contact.js'

const app = express()
const port = process.env.PORT || 8001

app.use(cors())
app.use(express.json())

// Add API prefix to all routes
app.use('/api/plants', plantsRouter)
app.use('/api/genus', genusRouter)
app.use('/api/contact', contactRouter)

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`)
})