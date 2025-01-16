import {Request,Response} from 'express'
import  axios  from 'axios';
import { AxiosError } from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const api_key = process.env.PUBG_API_KEY;

export const getAccountId = async (username:string):Promise<string>=> {
  const response = await axios.get(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${username}`,{
    headers:{Authorization:`Bearer ${api_key}`}
  });
  return response.data.data[0]?.id;
}


export const getRecentMatchIds = async (accountId: string): Promise<string[]> => {
    const response = await axios.get(`https://api.pubg.com/shards/steam/players/${accountId}/matches`, {
        headers: { Authorization: `Bearer ${api_key}` }
    });
    return response.data.data.slice(0, 5).map((match: any) => match.id);
};

export const getMatchDetails = async (matchId: string): Promise<any> =>{
    const response = await axios.get(`https://api.pubg.com/shards/steam/matches/${matchId}`,{
      headers:{Authorization:`Bearer ${api_key}`}
    });
    return response.data;
};

const filterMatch = async (
    matchIds: string[],
    criteria: {
        map: string;
        playerIds: string[];
        startTime: string;
        endTime: string;
    }
): Promise<any> => {
    for (const matchId of matchIds) {
        const match = await getMatchDetails(matchId);
        const matchTime = new Date(match.data.attributes.createdAt).getTime();
        const startTime = new Date(criteria.startTime).getTime();
        const endTime = new Date(criteria.endTime).getTime();

        if (match.data.attributes.mapName !== criteria.map) {
            continue;
        }

        if (matchTime < startTime || matchTime > endTime) {
            continue;
        }

        const playerIds = match.data.relationships.rosters.data.flatMap((roster: any) =>
            roster.relationships.participants.data.map((participant: any) => participant.id)
        );

        if (criteria.playerIds.every((id: string) => playerIds.includes(id))) {
            return match;
        }
    }

    return null;
};

export const PubgFetchMatchStat = async(req:Request, res:Response): Promise<any> => {
try {
    const { username, map, playerIds, startTime, endTime } = req.body;

    const accountId = await getAccountId(username);
    const matchIds = await getRecentMatchIds(accountId);
    const matchDetails = await Promise.all(matchIds.map(id => getMatchDetails(id)));
    const match = await filterMatch(matchDetails, { map, playerIds, startTime, endTime });

    if (!match) {
        return res.status(404).send({ error: 'Match not found!' });
    }

    res.status(200).json({
        message: 'Match details fetched successfully',
        matchDetails: matchDetails,
      });
} catch (err: unknown) {
    if (err instanceof AxiosError) {
      return res.status(500).send({error: `Failed to fetch Match Details: ${err.message}`});
    } else {
      return res.status(500).send({error: 'An unknown error occurred while fetching Match Details'});
    }
  }
}