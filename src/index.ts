import express from 'express'
import epicgamesRoutes from '../Routes/epicgamesRoutes.ts'
import RiotGamesRoutes from '../Routes/RiotGamesRoutes.ts'
import PubgRoutes from '../Routes/PubgRoutes.ts'
import steamworksRoutes from '../Routes/steamworksRoutes.ts'

const app = express()

app.use(express.json());

app.use('/epicgames', epicgamesRoutes)
app.use('/Riotgames', RiotGamesRoutes)
app.use('/Pubg', PubgRoutes)
app.use('/steamworks',steamworksRoutes)

