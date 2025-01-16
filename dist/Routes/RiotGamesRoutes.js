import { Router } from 'express';
import { LolFetchMatchStat } from '../Controllers/LoLController.js';
const router = Router();
router.get('/matchstat/leagueoflegends', LolFetchMatchStat);
export default router;
