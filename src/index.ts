import express from 'express';
import epicgamesRoutes from '../Routes/epicgamesRoutes';
import RiotGamesRoutes from '../Routes/RiotGamesRoutes';
import steamworksRoutes from '../Routes/steamworksRoutes';

const app = express();

app.use(express.json());

app.use('/epicgames', epicgamesRoutes)
app.use('/riotgames', RiotGamesRoutes)
app.use('/steamworks',steamworksRoutes)

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });

