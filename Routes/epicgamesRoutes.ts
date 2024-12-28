import { Router } from 'express';

const router = Router();

router.get('/fortnite/:username',PlayerStats)
router.get('/fortnite/recentmatches/:username', RecentMatches)

export default router;