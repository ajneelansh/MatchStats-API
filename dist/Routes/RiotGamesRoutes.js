import { Router } from 'express';
import { LolFetchMatchStat } from '../Controllers/riotGamesController.js';
const router = Router();
router.get('/matchstat/leagueoflegends', LolFetchMatchStat);
export default router;
