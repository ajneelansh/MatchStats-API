var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { riotClient } from '../helpers/RiotClient.js';
import { AxiosError } from 'axios';
const getpuuid = (name, tagline) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://aisa.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tagline}`;
    const response = yield riotClient.get(url);
    return response.data.puuid;
});
const getMatchIds = (puuid) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`;
    const response = yield riotClient.get(url, { params: { count: 5 } });
    return response.data;
});
const getMatchDetails = (matchId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`;
    const response = yield riotClient.get(url);
    return response.data;
});
const FilterMatchId = (puuid, requiredPlayerspuuids, requiredPlayersCount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matchIds = yield getMatchIds(puuid);
        for (const matchId of matchIds) {
            const matchDetails = yield getMatchDetails(matchId);
            const participants = matchDetails.info.participants;
            const playersIdentified = requiredPlayerspuuids.every((playerpuuid) => participants.some((participant) => participant.puuid === playerpuuid));
            if (participants.length === requiredPlayersCount && playersIdentified)
                return matchId;
        }
    }
    catch (err) {
        if (err instanceof AxiosError) {
            throw new Error(`No match found: ${err.message}`);
        }
        else {
            throw new Error('An unknown error occurred');
        }
    }
});
export const LolFetchMatchStat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tagLine, gameName } = req.body;
        if (!gameName || !tagLine) {
            return res.status(400).json({ error: 'Name and tagline are required' });
        }
        const puuid = yield getpuuid(gameName, tagLine);
        const matchIds = yield getMatchIds(puuid);
        const FinalMatchId = yield FilterMatchId(puuid, matchIds, 2);
        const FinalMatchDetails = yield getMatchDetails(FinalMatchId);
        res.status(200).json({
            message: 'Match timeline fetched successfully',
            FinalMatchDetails: FinalMatchDetails,
        });
    }
    catch (err) {
        if (err instanceof AxiosError) {
            throw new Error(`No match found: ${err.message}`);
        }
        else {
            throw new Error('An unknown error occurred');
        }
    }
});
