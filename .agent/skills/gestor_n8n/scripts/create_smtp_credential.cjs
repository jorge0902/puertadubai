const https = require('https');

const args = process.argv.slice(2);
const getKey = args.indexOf('--apiKey') > -1 ? args[args.indexOf('--apiKey') + 1] : null;

if (!getKey) {
    console.error('Uso: node create_smtp_credential.cjs --apiKey <KEY>');
    process.exit(1);
}

const payload = {
    "name": "Dhahabi Gmail SMTP",
    "type": "smtp",
    "data": {
        "user": "puertadubbai@gmail.com",
        "password": "hnpumvwmaxauufup",
        "host": "smtp.gmail.com",
        "port": 465,
        "secure": true
    }
};

const options = {
    hostname: 'n8n.puertadubai.online',
    path: '/api/v1/credentials',
    method: 'POST',
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
