# MatchStats API

For P2P wagering application, the most important thing is to get the result of the correct match either by available apis or zkp , i have created a server which has different routes for different games and tried to fetch the 
details of the correct match which have required participants and started between the given timestamps.This can be a way to verify the winner by getting data of match which is played just after initialisation of the challenge.

## Games Integrated
- [LeagueOfLegends](#LeagueOfLegends)
- [PlayersUndergroundBattleRoyale(Pubg-PC)](#Pubg)
- [Chess.com](#Chess.com)
- [Fortnite](#fortnite)

## Chess.com

### Get Match which suits the criteria given
**Endpoint:** `GET /chessdotcom/matchstat`

**Sample Body** 
```json
{
  "player1": "player1Username",
  "player2": "player2Username",
  "timestamp": "2023-01-01T00:00:00Z"
}
```

**Description:** 

the controller for chess.com will fetch the match which has nearest startTime from the given timestamp and which have required opponent and finally return the winner of the match


## Pubg-PC

### Get Match which suits the criteria given

**Endpoint:** `GET /pubg/matchstat`

**Sample Body** 
```json
{
  "username": "username",
  "map": "Erangel",
  "startTime": "2023-01-01T00:00:00Z",
  "endTime": "2023-01-01T00:00:00Z",
  "playerIds": ["..."]
}
```

**Description:** 

The controller for pubg will filterout the match which has given participants and match which starts between given timestamps and after getting the required matchId we can easily get the winner of the match.


## LeagueOfLegends

### Get Match which suits the criteria given

**Endpoint:** `GET /riotgames/matchstat/leagueoflegends`

**Description:** 

The controller for LeaugeOfLegends will fetch puuid by name and tagline and then fetch recent matchIDs through Riot api and filter-out the required match which has all the given participants and started between the given timestamp.In Response we get full match details through which winner could be declared.

**Sample Body:**
```json
{
    "region":"asia",
    "matchRegion":"sea",
    "gameName":"NekoDesu",
    "tagLine":"1009",
    "creationTime":1736782019671,
    "validationTime":1736783713182,
    "requiredPlayerspuuids":[
            "htwfeiqV94FLNJtIQiLV4EaveRYwu9KEF-FSyCbapHTkEFfEFQrsNJ3IVMYvtZvLTYYdz_VqU58YdQ",
            "qEkXXI3-CJqrRF4pP9RybAA8fU_WtCkNcQgXbD2b19RouNK4ngfgqLLafvkSPRqYf5Wj1O_hBBLgRw",
            "A6707s8EAFvi8sB3HTaTSTYZhKXynaxFS9CRS3fr4htDOz1L_QlE2D4gr9QMFR_8WQdJvie__fR9ZA",
            "JnmEiq7fx4JOQgvxwbx2jVev4mgV3JPt11jOniiTOKfplUxfI1xBSli10_doZPJbswTD3gPOQ7iC3g"
    ]
}
```

## Fortnite

### Get Match which suits the criteria given
**Endpoint:** `GET /epicgames/matchstat/fortnite`

**Description:** 

The controller for LeaugeOfLegends will fetch puuid by name and tagline and then fetch recent matchIDs through Riot api and filter-out the required match which has all the given participants and started between the given timestamp.In Response we get full match details and find out the winner

**Sample Request:**
```json
{
  "username": "playerUsername",
  "matchType": "solo",
  "accountIds": "accountId1,accountId2,accountId3"
}
```