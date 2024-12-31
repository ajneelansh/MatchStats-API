import express from 'express';
import epicgamesRoutes from '../Routes/epicgamesRoutes';
import RiotGamesRoutes from '../Routes/RiotGamesRoutes';

const app = express();

app.use(express.json());

app.use('/epicgames', epicgamesRoutes)
app.use('/riotgames', RiotGamesRoutes)

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });

