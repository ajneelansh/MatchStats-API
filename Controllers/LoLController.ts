import {Request,Response} from 'express'
import  axios  from 'axios';
import { AxiosError } from 'axios'
import dotenv from 'dotenv'

dotenv.config()
const api_key = process.env.RIOT_API_KEY;

export const getpuuid = async (region:string ,name:string , tagline: string): Promise<string> => {
  try{
    const url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tagline}?api_key=${api_key}`;
    const response = await axios.get(url);
    return response.data.puuid;
  }
  catch (err: unknown) {
    if (err instanceof AxiosError) {
     throw new Error(`Failed to fetch PUUID: ${err.response?.data?.message || err.message}`);
     }
     throw new Error('An unknown error occurred while fetching PUUID');
}
};

export const getMatchIds = async (region:string ,puuid : string, count:Number) : Promise<string[]> => {
 const url =`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=${api_key}`;
 const response = await axios.get(url);
 return response.data;
};

export const getMatchDetails = async (region:string, matchId: string): Promise<any> =>{
    const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${api_key}`;
    const response = await axios.get(url);
    return response.data;
};

const FilterMatchId = async (
    region:string,
    puuid: string,
    startTimestamp: number,
    endTimestamp:number,
    requiredPlayerspuuids: string[],
): Promise<any> => {

    try{
        const matchIds = await getMatchIds(region,puuid,20);

    for(const matchId of matchIds){
        const matchDetails = await getMatchDetails(region,matchId);
        const participants = matchDetails.metadata.participants;

        const playersIdentified = requiredPlayerspuuids.every((playerpuuid: any) => 
        participants.some((participant:any)=> participant === playerpuuid)
       );

       if(matchDetails.info.gameStartTimestamp >= startTimestamp && matchDetails.info.gameEndTimestamp <= endTimestamp && playersIdentified) {
        return matchId;
       }

      }
    } 
    catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw new Error(`No match found as per criteria: ${err.message}`);
      } else {
        throw new Error('An unknown error occurred');
      } 
}
}

export const LolFetchMatchStat = async(req:Request , res:Response): Promise<any> => {

  try {
    const { region,matchRegion, tagLine, gameName, creationTime, validationTime, requiredPlayerspuuids} = req.body;

    if (!matchRegion||!region || !gameName || !tagLine) {
      console.log('Missing required fields');
      return res.status(400).json({ error: 'Region, Name, and tagline are required' });
    }

    
    const puuid = await getpuuid(region,gameName, tagLine);
    const matchIds = await getMatchIds(matchRegion, puuid, 20);
    const FinalMatchId = await FilterMatchId(matchRegion, puuid, creationTime, validationTime, requiredPlayerspuuids);
    const FinalMatchDetails = await getMatchDetails(matchRegion, FinalMatchId);

    res.status(200).json({
      message: 'Match timeline fetched successfully',
      FinalMatchDetails: FinalMatchDetails
    });
  } catch (err: unknown) {
    console.error('Error occurred:', err);

    if (err instanceof AxiosError) {
      console.error('Axios error details:', err.response?.data);
      return res.status(500).json({ error: `Riot API Error: ${err.message}` });
    } else {
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}










