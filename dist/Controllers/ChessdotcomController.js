var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
const filterMatches = (username, opponent, year, month, timestamp) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.chess.com/pub/player/${username}/games/${year}/${month}`;
    try {
        const response = yield axios.get(url);
        const games = response.data.games || [];
        return games.filter((game) => {
            const isOpponent = game.white.includes(opponent) || game.black.includes(opponent);
            const matchTime = new Date(game.end_time * 1000);
            const givenTime = new Date(timestamp);
            const isTimestampClose = Math.abs(matchTime.getTime() - givenTime.getTime()) <= 2 * 60 * 1000;
            return isOpponent && isTimestampClose;
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Error fetching games for ${username}:`, err.message);
        }
        else {
            console.error(`Error fetching games for ${username}:`, err);
        }
        return [];
    }
});
const chessdotcomFetchMatchStat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { player1, player2, timestamp } = req.body;
    if (!player1 || !player2 || !timestamp) {
        return res.status(400).send({ error: "player1, player2, and timestamp are required!" });
    }
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    try {
        const [player1FilteredGames, player2FilteredGames] = yield Promise.all([
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
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error processing request:", error.message);
        }
        else {
            console.error("Error processing request:", error);
        }
        res.status(500).send({ error: "Internal server error" });
    }
});
export default chessdotcomFetchMatchStat;
