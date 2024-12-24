import { Router } from 'express';

const router = Router();

router.get('/leaugeoflegneds/:username',PlayerStats)
router.get('/leagueoflegends/recentmatches/:username', RecentMatches)

export default router;