import {Request,Response} from 'express'
import {riotClient} from '../helpers/RiotClient'
import { AxiosError } from 'axios'


const getpuuid = async (name:string , tagline: string): Promise<string> => {
 const url = `https://aisa.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tagline}`;
 const response = await riotClient.get(url);
 return response.data.puuid;
};

const getMatchIds = async (puuid : string) : Promise<string[]> => {
 const url =`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`;
 const response = await riotClient.get(url,{params:{ count:5 }});
 return response.data;
};

const getMatchDetails = async (matchId: string): Promise<any> =>{
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`;
    const response = await riotClient.get(url)
    return response.data;
};

const FilterMatchId = async (
    puuid: string,
    requiredPlayerspuuids: string[],
    requiredPlayersCount: number
): Promise<any> => {

    try{
        const matchIds = await getMatchIds(puuid);

    for(const matchId of matchIds){
        const matchDetails = await getMatchDetails(matchId);
        const participants = matchDetails.info.participants;

        const playersIdentified = requiredPlayerspuuids.every((playerpuuid: any) => 
        participants.some((participant:any)=> participant.puuid === playerpuuid)
       );

       if(participants.length === requiredPlayersCount && playersIdentified) 

       return matchId;

      }


    } 
    catch (err: unknown) {
      if (err instanceof AxiosError) {
        throw new Error(`No match found: ${err.message}`);
      } else {
        throw new Error('An unknown error occurred');
      }
}
}

export const LolFetchMatchStat = async(req:Request , res:Response): Promise<any> => {

try{
   const {tagLine, gameName} = req.body;

   if (!gameName || !tagLine) {
    return res.status(400).json({ error: 'Name and tagline are required' });
  }
   const puuid = await getpuuid(gameName,tagLine);
   const matchIds= await getMatchIds(puuid);

   const FinalMatchId = await FilterMatchId(puuid,matchIds,2);
   const FinalMatchDetails = await getMatchDetails(FinalMatchId);

   res.status(200).json({
    message: 'Match timeline fetched successfully',
    FinalMatchDetails: FinalMatchDetails,
  });
}

catch (err: unknown) {
  if (err instanceof AxiosError) {
    throw new Error(`No match found: ${err.message}`);
  } else {
    throw new Error('An unknown error occurred');
  }
 }
}








