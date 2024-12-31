import {Router} from 'express'
import { LolFetchMatchStat } from '../Controllers/riotGamesController'

const router = Router()

router.get('/leagueoflegends/matchstat',LolFetchMatchStat)

export default router