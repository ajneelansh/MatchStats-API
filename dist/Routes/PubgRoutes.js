import { Router } from 'express';
import { PubgFetchMatchStat } from '../Controllers/PubgController.js';
const router = Router();
router.get('/matchstat/pubg', PubgFetchMatchStat);
export default router;
