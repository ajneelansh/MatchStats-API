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
import getAccessToken from '../helpers/EpicClient.js';
const access_token = getAccessToken();
const getAccountId = (username) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = yield axios.get('https://api.epicgames.dev/users/public/names?displayName=${username}', {
        headers: { Authorization: 'Bearer ${access_token}' }
    });
    return (_a = response.data[0]) === null || _a === void 0 ? void 0 : _a.id;
});
const getRecentMatches = (accountId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get('https://api.fortnitetracker.com/v1/profile/account/${accountId}', {
            headers: { 'TRN-Api-Key': process.env.TRN_APIKEY }
        });
        const matches = response.data.matches;
        return matches.slice(0, 5);
    }
    catch (err) {
        if (err instanceof AxiosError) {
            throw new Error(`Cannot get Recent Matches: ${err.message}`);
        }
        else {
            throw new Error('An unknown error occurred');
        }
    }
});
const filterMatches = (matches, criteria) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return matches.find((match) => {
            if (match.playlist !== criteria.matchType) {
                return false;
            }
            const playerAccountIds = match.players.map((player) => player.id);
            return criteria.accountIds.every((id) => playerAccountIds.includes(id));
        });
    }
    catch (err) {
        if (err instanceof AxiosError) {
            throw new Error(`No Matches Found: ${err.message}`);
        }
        else {
            throw new Error('An unknown error occurred');
        }
    }
});
export const fortniteFetchMatchStat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const username = req.query.username;
        const matchType = req.query.matchType;
        const accountIds = (_a = req.query.accountIds) === null || _a === void 0 ? void 0 : _a.split(',');
        const criteria = { matchType, accountIds };
        if (!username) {
            return res.status(400).json({ message: "username is required" });
        }
        const accountId = yield getAccountId(username);
        const matches = yield getRecentMatches(accountId);
        const match = filterMatches(matches, criteria);
        if (match) {
            return res.json({
                message: "Match Details Fetches Sucessfully",
                matchDetails: match,
            });
        }
        else {
            return res.status(404).json({ message: "No match found for the given criteria" });
        }
    }
    catch (err) {
        if (err instanceof AxiosError) {
            throw new Error(`No Matches Found: ${err.message}`);
        }
        else {
            throw new Error('An unknown error occurred');
        }
    }
});
export default fortniteFetchMatchStat;
