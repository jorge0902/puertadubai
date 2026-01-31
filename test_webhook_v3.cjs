const https = require('https');

const data = JSON.stringify({
    nombre: "Antigravity Test Verification",
    whatsapp: "+1234567890",
    email: "test@verification.com",
    proximidad_viaje: "¡Listo para despegar ya! 🚀",
    pasaporte_ok: "Sí, lo tengo listo. ✅",
    presupuesto_rango: "C. Más de $4,000 USD (Inversión / Residencia VIP 🇦🇪)",
    meta_viaje: "Emprender mi propio negocio. 🚀",
    interes_contacto: "¡Sí, por favor! Me urge. 😍"
});

const options = {
    hostname: 'n8n.puertadubai.online',
    path: '/webhook/registro-isabel',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = https.request(options, (res) => {
    console.log(`StatusCode: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
