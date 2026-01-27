const tls = require('tls');

const options = {
    host: 'smtp.gmail.com',
    port: 465,
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
};

console.log('Connecting to Gmail SMTP...');

const socket = tls.connect(options, () => {
    console.log('Connected to smtp.gmail.com:465');
    console.log('Sending AUTH...');
    socket.write('EHLO client\r\n');
});

socket.setEncoding('utf8');

let step = 0;

socket.on('data', (data) => {
    console.log('< ' + data.trim());

    if (step === 0 && data.includes('220')) {
        step++;
        // Already sent EHLO in connect callback, but sometimes timing varies.
        // If we see 220, we expect EHLO response next if we sent it.
        // Let's just wait for EHLO response.
    }
    else if (data.includes('250-AUTH') || data.includes('250 OK') || data.includes('250-smtp.gmail.com')) {
        if (step === 1) { // EHLO response
            step++;
            socket.write('AUTH LOGIN\r\n');
        }
    }
    else if (data.includes('334 VXNlcm5hbWU6')) { // Username:
        step++;
        const user = Buffer.from('puertadubbai@gmail.com').toString('base64');
        socket.write(user + '\r\n');
    }
    else if (data.includes('334 UGFzc3dvcmQ6')) { // Password:
        step++;
        const pass = Buffer.from('hnpumvwmaxauufup').toString('base64');
        socket.write(pass + '\r\n');
    }
    else if (data.includes('235 2.7.0 Accepted')) {
        console.log('✅ AUTH SUCCESS! Credentials are valid.');
        socket.write('QUIT\r\n');
        process.exit(0);
    }
    else if (data.includes('535')) {
        console.error('❌ AUTH FAILED: Invalid credentials.');
        process.exit(1);
    }
});

socket.on('error', (err) => {
    console.error('Connection Error:', err);
    process.exit(1);
});
