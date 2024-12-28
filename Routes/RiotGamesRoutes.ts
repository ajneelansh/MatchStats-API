import {Router} from 'express'

const router = Router()

router.get('/leagueoflegends/matchstat',LolFetchMatchStats)

export default router