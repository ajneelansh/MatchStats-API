import {Router} from 'express'
import { PubgFetchMatchStat } from '../Controllers/PubgController'
import exp from 'constants'

const router = Router()

router.get('/matchstat',PubgFetchMatchStat)

export default router