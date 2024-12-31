import {Request, Response} from 'express'
import axios from 'axios'
import getAccessToken from '../helpers/EpicClient'

const access_token = getAccessToken();

const getAccountId = async (username:string) => {
  const response = await axios.get('https://api.epicgames.dev/users/public/names?displayName=${username}',{
    headers:{Authorization:'Bearer ${access_token}'}
  });
  return response.data[0]?.id;
}

export const fortniteFetchMatchStat = async(req:Request, res:Response): Promise<any> => {
    

}