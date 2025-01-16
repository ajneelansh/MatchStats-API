import {Request, Response} from 'express'
import axios from 'axios'


const filterMatches = async (username:string, opponent:string, year:number, month:string, timestamp:Date) => {

    const url = `https://api.chess.com/pub/player/${username}/games/${year}/${month}`;
  try {
    const response = await axios.get(url);
    const games = response.data.games || [];
    
    return games.filter((game: { white: string | string[]; black: string | string[]; end_time: number; }) => {
      const isOpponent =
        game.white.includes(opponent) || game.black.includes(opponent);

    
      const matchTime = new Date(game.end_time * 1000);
      const givenTime = new Date(timestamp);
      const isTimestampClose = Math.abs(matchTime.getTime() - givenTime.getTime()) <= 2 * 60 * 1000;

      return isOpponent && isTimestampClose;
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error fetching games for ${username}:`, err.message);
    } else {
      console.error(`Error fetching games for ${username}:`, err);
    }
    return [];
  }
    
}

const chessdotcomFetchMatchStat = async (req: Request, res: Response): Promise<any> => {
    const { player1, player2, timestamp } = req.body;

    if (!player1 || !player2 || !timestamp) {
      return res.status(400).send({ error: "player1, player2, and timestamp are required!" });
    }
  
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  
    try {
   
      const [player1FilteredGames, player2FilteredGames] = await Promise.all([
        filterMatches(player1, player2, year, month, timestamp),
        filterMatches(player2, player1, year, month, timestamp),
      ]);
  
      const match = [...player1FilteredGames, ...player2FilteredGames][0];
  
      if (!match) {
        return res.status(404).send({ error: "Match not found!" });
      }
  

      const winner = match.white.includes(player1)
        ? match.white_result
        : match.black_result;
  
      res.send({
        match,
        winner: winner === "win" ? player1 : winner === "loss" ? player2 : "draw",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error processing request:", error.message);
      } else {
        console.error("Error processing request:", error);
      }
      res.status(500).send({ error: "Internal server error" });
    }
}

export default chessdotcomFetchMatchStat;