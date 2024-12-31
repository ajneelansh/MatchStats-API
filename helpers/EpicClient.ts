import axios from 'axios';

const getAccessToken = async () => {
    const response = await axios.post(
        "https://api.epicgames.dev/auth/oauth/v2/token",
        new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.CLIENT_ID || '',
            client_secret: process.env.CLIENT_SECRET || '',
        }),
        {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
    );

    return response.data.access_token;
}

export default getAccessToken;