import { Router } from 'express';
import { LolFetchMatchStat } from '../Controllers/EpicGamesController.js';
const router = Router();
router.get('/leagueoflegends/matchstat', LolFetchMatchStat);
export default router;
