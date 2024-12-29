import {Router} from 'express'
import { LolFetchMatchStat } from '../Controllers/EpicGamesController'

const router = Router()

router.get('/leagueoflegends/matchstat',LolFetchMatchStat)

export default router