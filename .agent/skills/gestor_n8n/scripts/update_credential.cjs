const https = require('https');

const args = process.argv.slice(2);
const getId = args.indexOf('--id') > -1 ? args[args.indexOf('--id') + 1] : null;
const getKey = args.indexOf('--apiKey') > -1 ? args[args.indexOf('--apiKey') + 1] : null;

// New value for the credential
const NEW_API_KEY = "m8mhao5g7e99yrlz4s0dp6";

if (!getId || !getKey) {
    console.error('Uso: node update_credential.cjs --id <ID> --apiKey <KEY>');
    process.exit(1);
}

// Data structure for httpHeaderAuth
// Based on typical n8n structure: { "data": { "name": "apikey", "value": "..." } }
const payload = {
    "data": {
        "name": "apikey",
        "value": NEW_API_KEY
    }
};

const options = {
    hostname: 'n8n.puertadubai.online',
    path: `/api/v1/credentials/${getId}`,
    method: 'PUT',
    headers: {
        'X-N8N-API-KEY': getKey,
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log(data);
    });
});

req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
});

req.write(JSON.stringify(payload));
req.end();
