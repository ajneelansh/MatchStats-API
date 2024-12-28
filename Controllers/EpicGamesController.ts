import {Request,Response} from 'express'
import axios from 'axios'
import dotenv from 'dotenv'

const getpuuid = async (name:string , tagline: string): Promise<string> => {

 const url = `https://aisa.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tagline}`;
 const response = await riotClient.get(url);
 
 return response.data.puuid;
};

const 




export const LolFetchMatchStats = async(req:Request , res:Response): Promise<void> => {

   const {tagLine, gameName} = req.body;

   try {
    const firstApiResponse = await axios.get('', )
   }
}