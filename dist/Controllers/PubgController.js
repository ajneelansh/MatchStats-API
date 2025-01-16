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
import { AxiosError } from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const api_key = process.env.PUBG_API_KEY;
export const getAccountId = (username) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = yield axios.get(`https://api.pubg.com/shards/steam/players?filter[playerNames]=${username}`, {
        headers: { Authorization: `Bearer ${api_key}` }
    });
    return (_a = response.data.data[0]) === null || _a === void 0 ? void 0 : _a.id;
});
export const getRecentMatchIds = (accountId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get(`https://api.pubg.com/shards/steam/players/${accountId}/matches`, {
        headers: { Authorization: `Bearer ${api_key}` }
    });
    return response.data.data.slice(0, 5).map((match) => match.id);
});
export const getMatchDetails = (matchId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.get(`https://api.pubg.com/shards/steam/matches/${matchId}`, {
        headers: { Authorization: `Bearer ${api_key}` }
    });
    return response.data;
});
const filterMatch = (matchIds, criteria) => __awaiter(void 0, void 0, void 0, function* () {
    for (const matchId of matchIds) {
        const match = yield getMatchDetails(matchId);
        const matchTime = new Date(match.data.attributes.createdAt).getTime();
        const startTime = new Date(criteria.startTime).getTime();
        const endTime = new Date(criteria.endTime).getTime();
        if (match.data.attributes.mapName !== criteria.map) {
            continue;
        }
        if (matchTime < startTime || matchTime > endTime) {
            continue;
        }
        const playerIds = match.data.relationships.rosters.data.flatMap((roster) => roster.relationships.participants.data.map((participant) => participant.id));
        if (criteria.playerIds.every((id) => playerIds.includes(id))) {
            return match;
        }
    }
    return null;
});
export const PubgFetchMatchStat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.query.username;
        const map = req.query.map;
        const playerIds = req.query.playerIds.split(',');
        const startTime = req.query.startTime;
        const endTime = req.query.endTime;
        const accountId = yield getAccountId(username);
        const matchIds = yield getRecentMatchIds(accountId);
        const matchDetails = yield Promise.all(matchIds.map(id => getMatchDetails(id)));
        const match = yield filterMatch(matchDetails, { map, playerIds, startTime, endTime });
        if (!match) {
            return res.status(404).send({ error: 'Match not found!' });
        }
        return res.send(match);
    }
    catch (err) {
        if (err instanceof AxiosError) {
            return res.status(500).send({ error: `Failed to fetch Match Details: ${err.message}` });
        }
        else {
            return res.status(500).send({ error: 'An unknown error occurred while fetching Match Details' });
        }
    }
});
