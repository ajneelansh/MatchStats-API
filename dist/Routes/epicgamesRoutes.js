import { Router } from 'express';
import { fortniteFetchMatchStat } from '../Controllers/riotGamesController.js';
const router = Router();
router.get('/fortnite/matchstat', fortniteFetchMatchStat);
export default router;
