const https = require('https');

const args = process.argv.slice(2);
const getId = args.indexOf('--id') > -1 ? args[args.indexOf('--id') + 1] : null;
const getKey = args.indexOf('--apiKey') > -1 ? args[args.indexOf('--apiKey') + 1] : null;

if (!getId || !getKey) {
    console.error('Uso: node activate_workflow.cjs --id <ID> --apiKey <KEY>');
    process.exit(1);
}

const options = {
    hostname: 'n8n.puertadubai.online',
    path: `/api/v1/workflows/${getId}/activate`,
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
        console.log(`Status de Activación: ${res.statusCode}`);
        if (res.statusCode === 200) {
            console.log('¡Workflow activado con éxito! Ahora funcionará en producción.');
        } else {
            console.log(`Respuesta: ${data}`);
        }
    });
});

req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
});

req.end();
