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
const api_key = process.env.RIOT_API_KEY;
export const getpuuid = (region, name, tagline) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tagline}?api_key=${api_key}`;
        const response = yield axios.get(url);
        return response.data.puuid;
    }
    catch (err) {
        if (err instanceof AxiosError) {
            throw new Error(`Failed to fetch PUUID: ${((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || err.message}`);
        }
        throw new Error('An unknown error occurred while fetching PUUID');
    }
});
export const getMatchIds = (region, puuid, count) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=${api_key}`;
    const response = yield axios.get(url);
    return response.data;
});
export const getMatchDetails = (region, matchId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${api_key}`;
    const response = yield axios.get(url);
    return response.data;
});
const FilterMatchId = (region, puuid, startTimestamp, endTimestamp, requiredPlayerspuuids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matchIds = yield getMatchIds(region, puuid, 20);
        for (const matchId of matchIds) {
            const matchDetails = yield getMatchDetails(region, matchId);
            const participants = matchDetails.metadata.participants;
            const playersIdentified = requiredPlayerspuuids.every((playerpuuid) => participants.some((participant) => participant === playerpuuid));
            if (matchDetails.info.gameStartTimestamp >= startTimestamp && matchDetails.info.gameEndTimestamp <= endTimestamp && playersIdentified) {
                return matchId;
            }
        }
    }
    catch (err) {
        if (err instanceof AxiosError) {
            throw new Error(`No match found as per criteria: ${err.message}`);
        }
        else {
            throw new Error('An unknown error occurred');
        }
    }
});
export const LolFetchMatchStat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { region, matchRegion, tagLine, gameName, creationTime, validationTime, requiredPlayerspuuids } = req.body;
        if (!matchRegion || !region || !gameName || !tagLine) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'Region, Name, and tagline are required' });
        }
        const puuid = yield getpuuid(region, gameName, tagLine);
        const matchIds = yield getMatchIds(matchRegion, puuid, 20);
        const FinalMatchId = yield FilterMatchId(matchRegion, puuid, creationTime, validationTime, requiredPlayerspuuids);
        const FinalMatchDetails = yield getMatchDetails(matchRegion, FinalMatchId);
        res.status(200).json({
            message: 'Match timeline fetched successfully',
            FinalMatchDetails: FinalMatchDetails
        });
    }
    catch (err) {
        console.error('Error occurred:', err);
        if (err instanceof AxiosError) {
            console.error('Axios error details:', (_a = err.response) === null || _a === void 0 ? void 0 : _a.data);
            return res.status(500).json({ error: `Riot API Error: ${err.message}` });
        }
        else {
            return res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
