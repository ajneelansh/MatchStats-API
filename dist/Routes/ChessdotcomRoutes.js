import { Router } from "express";
import chessdotcomFetchMatchStat from "../Controllers/ChessdotcomController.js";
const router = Router();
router.get('/matchstat/chessdotcom', chessdotcomFetchMatchStat);
export default router;
