import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
const RIOT_API_KEY = process.env.RIOT_API_KEY;
export const riotClient = axios.create({
    headers: {
        'X-Riot-Token': RIOT_API_KEY
    }
});
export default riotClient;
