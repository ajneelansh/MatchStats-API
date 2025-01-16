import { Router } from 'express';
import {fortniteFetchMatchStat}  from '../Controllers/FortniteController';

const router = Router();

router.get('/matchstat/fortnite',fortniteFetchMatchStat)

export default router;