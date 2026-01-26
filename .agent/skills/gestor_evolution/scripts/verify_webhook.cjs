const https = require('http'); // Evolution API uses HTTP based on provided URL

const args = process.argv.slice(2);
const getInstance = args.indexOf('--instance') > -1 ? args[args.indexOf('--instance') + 1] : null;
const getKey = args.indexOf('--apiKey') > -1 ? args[args.indexOf('--apiKey') + 1] : null;
const getN8nUrl = args.indexOf('--n8nUrl') > -1 ? args[args.indexOf('--n8nUrl') + 1] : null;
const fix = args.indexOf('--fix') > -1;

if (!getInstance || !getKey || !getN8nUrl) {
    console.error('Uso: node verify_webhook.cjs --instance <NAME> --apiKey <KEY> --n8nUrl <URL> [--fix]');
    process.exit(1);
}

const BASE_URL = 'http://62.84.189.155:8080';

// 1. Fetch Instance Config
// Endpoint to get settings/webhook usually requires checking documentation or standard endpoints.
// Common endpoint: /webhook/find/:instance
const options = {
    hostname: '62.84.189.155',
    port: 8080,
    path: `/webhook/find/${getInstance}`,
    method: 'GET',
    headers: {
        'apikey': getKey,
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        if (res.statusCode !== 200) {
            console.error(`Error al obtener webhook: ${res.statusCode} ${data}`);
            return;
        }

        const config = JSON.parse(data);
        console.log('Configuración actual:', JSON.stringify(config, null, 2));

        // Evolution API structure verification
        // Usually returns object with "url" or similar inside.
        // Let's assume structure based on common Evolution API responses or inspect output.
        // Usually: { "webhook": { "url": "...", "enabled": true } } or similar.

        let currentUrl = config.webhook?.url || config.url || '';
        if (!currentUrl && config.find) currentUrl = config.find.url; // Potential structure adaptation

        // Use a loose check if structure is unknown, but let's try to parse
        console.log(`URL actual en Evolution: ${currentUrl}`);
        console.log(`URL esperada (n8n): ${getN8nUrl}`);

        if (currentUrl.trim() !== getN8nUrl.trim()) {
            console.warn('¡DESIGUALDAD DETECTADA!');
            if (fix) {
                updateWebhook(getInstance, getKey, getN8nUrl);
            } else {
                console.log('Usa el flag --fix para corregirlo automáticamente.');
            }
        } else {
            console.log('✅ Las URLs coinciden. Todo correcto.');
        }
    });
});

req.on('error', (e) => {
    console.error(`Error de red: ${e.message}`);
});

req.end();

function updateWebhook(instance, key, url) {
    console.log('Intentando actualizar webhook...');
    // Adjusted payload based on error "instance requires property url"
    // Using widely compatible payload for Evolution API
    const payload = {
        "url": url,
        "webhookByEvents": false,
        "webhookBase64": false,
        "enabled": true,
        "events": [
            "MESSAGES_UPSERT",
            "MESSAGES_UPDATE",
            "SEND_MESSAGE"
        ]
    };

    // Endpoint to set webhook: /webhook/set/:instance
    const setOptions = {
        hostname: '62.84.189.155',
        port: 8080,
        path: `/webhook/set/${instance}`,
        method: 'POST',
        headers: {
            'apikey': key,
            'Content-Type': 'application/json'
        }
    };

    const setReq = https.request(setOptions, (res) => {
        let data = '';
        res.on('data', (c) => data += c);
        res.on('end', () => {
            console.log(`Respuesta actualización: ${res.statusCode} ${data}`);
        });
    });

    setReq.write(JSON.stringify(payload));
    setReq.end();
}
