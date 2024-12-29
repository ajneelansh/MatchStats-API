import express from 'express';
import epicgamesRoutes from '../Routes/epicgamesRoutes.js';
import RiotGamesRoutes from '../Routes/RiotGamesRoutes.js';
import steamworksRoutes from '../Routes/steamworksRoutes.js';
const app = express();
app.use(express.json());
app.use('/epicgames', epicgamesRoutes);
app.use('/Riotgames', RiotGamesRoutes);
app.use('/steamworks', steamworksRoutes);
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
