import express from 'express';
import epicgamesRoutes from '../Routes/EpicGamesRoutes';
import RiotGamesRoutes from '../Routes/RiotGamesRoutes';
import chessdotcomRoutes from '../Routes/ChessdotcomRoutes';

const app = express();

app.use(express.json());

app.use('/epicgames', epicgamesRoutes)
app.use('/riotgames', RiotGamesRoutes)
app.use('/chessdotcom', chessdotcomRoutes)

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });

