import {Request, Response} from 'express'
import axios from 'axios'
import { AxiosError } from 'axios';


const getAccountId = async (username:string):Promise<string>=> {
  const response = await axios.get('https://api.epicgames.dev/users/public/names?displayName=${username}',{
    headers:{Authorization:'Bearer ${access_token}'}
  });
  return response.data[0]?.id;
}

const getRecentMatches = async (accountId:string): Promise<any[]> => {
  try{
    const response = await axios.get('https://api.fortnitetracker.com/v1/profile/account/${accountId}',{
       headers: {'TRN_API_KEY': process.env.TRN_APIKEY}
    });
    
    const matches = response.data.matches;
    return matches.slice(0,5);
  }
  catch(err:unknown){
    if (err instanceof AxiosError) {
      throw new Error(`Cannot get Recent Matches: ${err.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

const filterMatches = async (
  matches: any[],
  criteria :{
    matchType : string;
    accountIds : string[];
  }
) =>{
 try{
  return matches.find((match) => {
    if (match.playlist !== criteria.matchType) {
      return false;
    }
    const playerAccountIds = match.players.map((player:any)=> player.id);
    return criteria.accountIds.every((id:string) => playerAccountIds.includes(id)); 
    }
  )
 }
 catch(err:unknown){
  if (err instanceof AxiosError) {
    throw new Error(`No Matches Found: ${err.message}`);
  } else {
    throw new Error('An unknown error occurred');
  } 
 }
}


export const fortniteFetchMatchStat = async(req:Request, res:Response): Promise<any> => {
  try{    
  const username = req.body.username as string;
  const matchType = req.body.matchType as string;
  const accountIds = (req.body.accountIds as string)?.split(',');
  const criteria = { matchType, accountIds };

   if(!username) {
    return res.status(400).json({message:"username is required"})
   }

   const accountId = await getAccountId(username);
   const matches = await getRecentMatches(accountId);

   const match = filterMatches(matches , criteria);
   
   if (match) {
    return res.json({
      message: "Match Details Fetches Sucessfully",
      matchDetails : match,
    });
  } else {
    return res.status(404).json({ message: "No match found for the given criteria" });
  }

  }
  catch(err:unknown){
    if (err instanceof AxiosError) {
      throw new Error(`No Matches Found: ${err.message}`);
    } else {
      throw new Error('An unknown error occurred');
    } 
   }
}

export default fortniteFetchMatchStat;