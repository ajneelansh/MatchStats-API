import express from 'express';
import epicgamesRoutes from '../Routes/epicgamesRoutes.js';
import RiotGamesRoutes from '../Routes/RiotGamesRoutes.js';
import chessdotcomRoutes from '../Routes/ChessdotcomRoutes.js';
import PubgRoutes from '../Routes/PubgRoutes.js';
const app = express();
app.use(express.json());
app.use('/epicgames', epicgamesRoutes);
app.use('/riotgames', RiotGamesRoutes);
app.use('/chessdotcom', chessdotcomRoutes);
app.use('/pubg', PubgRoutes);
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
