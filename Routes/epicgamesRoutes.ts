import { Router } from 'express';

const router = Router();

router.get('/valorant/:username',PlayerStats)
router.get('/valorant/recentmatches/:username', RecentMatches)

export default router;