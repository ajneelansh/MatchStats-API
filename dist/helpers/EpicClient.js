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
const getAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios.post("https://api.epicgames.dev/auth/oauth/v2/token", new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID || '',
        client_secret: process.env.CLIENT_SECRET || '',
    }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data.access_token;
});
export default getAccessToken;
