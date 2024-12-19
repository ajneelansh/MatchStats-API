import express from 'express'
import epicgamesRoutes from '/Routes/epicgamesRoutes.ts'
const app = express()

app.use(express.json());

app.use('/epicgames')
