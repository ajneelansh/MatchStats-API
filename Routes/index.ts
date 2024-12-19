const express = require('express')
const app = express()

app.get("/PUBG/:username", Pubg)
app.get("/Fortnite/:username", Fortnite)
app.get("/leagueoflegends/:username", LeagueOfLegends)
app.get("/Valorant/:username", Valorant)
app.get("/Fallguys/:username", Controllers.FallGuys)
app.get("/cod/:username", Controllers.CallOfDuty)