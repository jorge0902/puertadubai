const https = require('https');

const args = process.argv.slice(2);
const getId = args.indexOf('--id') > -1 ? args[args.indexOf('--id') + 1] : null;
const getKey = args.indexOf('--apiKey') > -1 ? args[args.indexOf('--apiKey') + 1] : null;

if (!getId || !getKey) {
    console.error('Uso: node get_credential.cjs --id <ID> --apiKey <KEY>');
    process.exit(1);
}

const options = {
    hostname: 'n8n.puertadubai.online',
    path: `/api/v1/credentials?includeData=true`,
    method: 'GET',
    headers: {
        'X-N8N-API-KEY': getKey,
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        if (res.statusCode !== 200) {
            console.error(`Error: ${res.statusCode} ${data}`);
            return;
        }
        const fs = require('fs');
        fs.writeFileSync('credentials_list.json', data);
        console.log('Saved to credentials_list.json');
    });
});

req.on('error', (e) => {
    console.error(`Error de red: ${e.message}`);
});

req.end();
