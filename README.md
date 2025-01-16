# MatchStats API

## Table of Contents
- [Chess.com](#Chess.com)
- [PlayersUndergroundBattleRoyale(Pubg-PC)](#Pubg)
- [LeagueOfLegends](#LoL)
- [Fortnite](#fortnite)

## Chess.com

### Get Match which suits the criteria given
**Endpoint:** `GET /`

**Description:** Retrieves a list of all football matches.

**Sample Request:**
```http
GET /api/football/matches
```

**Sample Response:**
```json
[
    {
        "match_id": 1,
        "team_a": "Team A",
        "team_b": "Team B",
        "score_a": 2,
        "score_b": 1,
        "date": "2023-10-01"
    },
    ...
]
```

### Filter Matches by Date
**Endpoint:** `GET /api/football/matches?date={date}`

**Description:** Retrieves football matches filtered by a specific date.

**Sample Request:**
```http
GET /api/football/matches?date=2023-10-01
```

**Sample Response:**
```json
[
    {
        "match_id": 1,
        "team_a": "Team A",
        "team_b": "Team B",
        "score_a": 2,
        "score_b": 1,
        "date": "2023-10-01"
    }
]
```

## Basketball

### Get All Matches
**Endpoint:** `GET /api/basketball/matches`

**Description:** Retrieves a list of all basketball matches.

**Sample Request:**
```http
GET /api/basketball/matches
```

**Sample Response:**
```json
[
    {
        "match_id": 1,
        "team_a": "Team A",
        "team_b": "Team B",
        "score_a": 98,
        "score_b": 95,
        "date": "2023-10-01"
    },
    ...
]
```

### Filter Matches by Date
**Endpoint:** `GET /api/basketball/matches?date={date}`

**Description:** Retrieves basketball matches filtered by a specific date.

**Sample Request:**
```http
GET /api/basketball/matches?date=2023-10-01
```

**Sample Response:**
```json
[
    {
        "match_id": 1,
        "team_a": "Team A",
        "team_b": "Team B",
        "score_a": 98,
        "score_b": 95,
        "date": "2023-10-01"
    }
]
```

## Cricket

### Get All Matches
**Endpoint:** `GET /api/cricket/matches`

**Description:** Retrieves a list of all cricket matches.

**Sample Request:**
```http
GET /api/cricket/matches
```

**Sample Response:**
```json
[
    {
        "match_id": 1,
        "team_a": "Team A",
        "team_b": "Team B",
        "score_a": 250,
        "score_b": 245,
        "date": "2023-10-01"
    },
    ...
]
```

### Filter Matches by Date
**Endpoint:** `GET /api/cricket/matches?date={date}`

**Description:** Retrieves cricket matches filtered by a specific date.

**Sample Request:**
```http
GET /api/cricket/matches?date=2023-10-01
```

**Sample Response:**
```json
[
    {
        "match_id": 1,
        "team_a": "Team A",
        "team_b": "Team B",
        "score_a": 250,
        "score_b": 245,
        "date": "2023-10-01"
    }
]
```
## Tennis

### Get All Matches
**Endpoint:** `GET /api/tennis/matches`

**Description:** Retrieves a list of all tennis matches.

**Sample Request:**
```http
GET /api/tennis/matches
```

**Sample Response:**
```json
[
    {
        "match_id": 1,
        "player_a": "Player A",
        "player_b": "Player B",
        "score_a": 3,
        "score_b": 2,
        "date": "2023-10-01"
    },
    ...
]
```

### Filter Matches by Date
**Endpoint:** `GET /api/tennis/matches?date={date}`

**Description:** Retrieves tennis matches filtered by a specific date.

**Sample Request:**
```http
GET /api/tennis/matches?date=2023-10-01
```

**Sample Response:**
```json
[
    {
        "match_id": 1,
        "player_a": "Player A",
        "player_b": "Player B",
        "score_a": 3,
        "score_b": 2,
        "date": "2023-10-01"
    }
]
```

## Baseball

### Get All Matches
**Endpoint:** `GET /api/baseball/matches`

**Description:** Retrieves a list of all baseball matches.

**Sample Request:**
```http
GET /api/baseball/matches
```

**Sample Response:**
```json
[
    {
        "match_id": 1,
        "team_a": "Team A",
        "team_b": "Team B",
        "score_a": 5,
        "score_b": 3,
        "date": "2023-10-01"
    },
    ...
]
```

### Filter Matches by Date
**Endpoint:** `GET /api/baseball/matches?date={date}`

**Description:** Retrieves baseball matches filtered by a specific date.

**Sample Request:**
```http
GET /api/baseball/matches?date=2023-10-01
```

**Sample Response:**
```json
[
    {
        "match_id": 1,
        "team_a": "Team A",
        "team_b": "Team B",
        "score_a": 5,
        "score_b": 3,
        "date": "2023-10-01"
    }
]
```