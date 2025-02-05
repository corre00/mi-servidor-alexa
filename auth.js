const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

const clientId = 'amzn1.application-oa2-client.98a9d48aa991416dacadb0d697088dec ';
const clientSecret = process.env.CLIENT_SECRET;

async function getAccessToken() {
    const tokenUrl = 'https://api.amazon.com/auth/o2/token';
    const data = {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'alexa::proactive_events'
    };

    try {
        const response = await axios.post(tokenUrl, qs.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error obteniendo el token de acceso:', error);
        throw error;
    }
}

async function sendProactiveEvent() {
    const accessToken = await getAccessToken();

    const event = {
        "timestamp": new Date().toISOString(),
        "referenceId": "unique-id",
        "expiryTime": new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        "event": {
            "name": "AMAZON.MessageAlert.Activated",
            "payload": {
                "state": {
                    "status": "UNREAD"
                },
                "messageGroup": {
                    "creator": {
                        "name": "John Doe"
                    },
                    "count": 1
                }
            }
        },
        "relevantAudience": {
            "type": "Unicast",
            "payload": {
                "user": "amzn1.ask.account.your-account-id"
            }
        }
    };

    const response = await axios.post('https://api.amazonalexa.com/v1/proactiveEvents', event, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    console.log('Evento enviado:', response.data);
}

sendProactiveEvent().catch(console.error);