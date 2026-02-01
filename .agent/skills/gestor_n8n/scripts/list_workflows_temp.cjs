const https = require('https');

const args = process.argv.slice(2);
const getKey = args.indexOf('--apiKey') > -1 ? args[args.indexOf('--apiKey') + 1] : null;

if (!getKey) {
    console.error('Uso: node list_workflows_temp.cjs --apiKey <KEY>');
    process.exit(1);
}

const options = {
    hostname: 'n8n.puertadubai.online',
    path: `/api/v1/workflows`,
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
        try {
            const json = JSON.parse(data);
            const workflows = json.data;
            workflows.forEach(w => {
                console.log(`ID: ${w.id} | Name: ${w.name}`);
            });
        } catch (e) {
            console.error('Error parsing JSON:', e);
            console.log('Raw data:', data);
        }
    });
});

req.on('error', (e) => {
    console.error(`Error de red: ${e.message}`);
});

req.end();
