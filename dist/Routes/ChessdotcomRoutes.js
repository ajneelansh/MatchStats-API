import { Router } from "express";
import chessdotcomFetchMatchStat from "../Controllers/ChessdotcomController";
const router = Router();
router.get('/matchstat/chessdotcom', chessdotcomFetchMatchStat);
export default router;
