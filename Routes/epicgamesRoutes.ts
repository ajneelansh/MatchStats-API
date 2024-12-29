import { Router } from 'express';
import { fortniteFetchMatchStat } from '../Controllers/riotGamesController';

const router = Router();

router.get('/fortnite/matchstat',fortniteFetchMatchStat)

export default router;