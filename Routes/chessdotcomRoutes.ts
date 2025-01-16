import { Router } from "express";
import  chessdotcomFetchMatchStat  from "../Controllers/chessdotcomController"; 

const router = Router();   

router.get('/matchstat/chessdotcom',chessdotcomFetchMatchStat)

export default router;