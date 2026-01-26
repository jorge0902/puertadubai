const https = require('https');
const fs = require('fs');

const args = process.argv.slice(2);
const getId = args.indexOf('--id') > -1 ? args[args.indexOf('--id') + 1] : null;
const getKey = args.indexOf('--apiKey') > -1 ? args[args.indexOf('--apiKey') + 1] : null;
const getJsonPath = args.indexOf('--json') > -1 ? args[args.indexOf('--json') + 1] : null;

if (!getId || !getKey || !getJsonPath) {
    console.error('Uso: node update_workflow.js --id <ID> --apiKey <KEY> --json <PATH>');
    process.exit(1);
}

const newContent = JSON.parse(fs.readFileSync(getJsonPath, 'utf8'));

const options = {
    hostname: 'n8n.puertadubai.online',
    path: `/api/v1/workflows/${getId}`,
    method: 'GET',
    headers: {
        'X-N8N-API-KEY': getKey,
        'Content-Type': 'application/json'
    }
};

// Pasos:
// 1. Obtener el workflow actual para preservar lo que no cambia.
// 2. Fusionar/Reemplazar los nodos específicos.
// 3. Enviar PUT.

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        if (res.statusCode !== 200) {
            console.error(`Error al obtener workflow: ${res.statusCode} ${data}`);
            return;
        }

        const currentWorkflow = JSON.parse(data);

        // Estrategia simplificada: Reemplazar nodos por nombre si existen en el nuevo contenido
        // O si newContent tiene estructura completa, usarla.

        let finalWorkflowData = currentWorkflow;

        // Si el usuario pasa un array de nodos, actualizamos solo esos
        if (Array.isArray(newContent)) {
            newContent.forEach(newNode => {
                const index = finalWorkflowData.nodes.findIndex(n => n.name === newNode.name);
                if (index !== -1) {
                    finalWorkflowData.nodes[index] = { ...finalWorkflowData.nodes[index], ...newNode };
                    console.log(`Actualizando nodo: ${newNode.name}`);
                } else {
                    finalWorkflowData.nodes.push(newNode);
                    console.log(`Agregando nodo: ${newNode.name}`);
                }
            });
        } else if (newContent.nodes) {
            // Reemplazo completo si tiene "nodes"
            finalWorkflowData.nodes = newContent.nodes;
            if (newContent.connections) finalWorkflowData.connections = newContent.connections;
            console.log(`Reemplazo completo de nodos.`);
        }

        // PUT Update
        const putOptions = { ...options, method: 'PUT' };

        // Sanitize: Keep only writable fields
        const allowedKeys = ['name', 'nodes', 'connections', 'settings'];
        const payload = {};
        allowedKeys.forEach(key => {
            if (finalWorkflowData[key] !== undefined) {
                payload[key] = finalWorkflowData[key];
            }
        });

        const putReq = https.request(putOptions, (putRes) => {
            let putData = '';
            putRes.on('data', (c) => putData += c);
            putRes.on('end', () => {
                console.log(`Status Actualización: ${putRes.statusCode}`);
                if (putRes.statusCode === 200) {
                    console.log('Workflow actualizado con éxito.');
                } else {
                    console.error('Error al actualizar:', putData);
                }
            });
        });
        putReq.write(JSON.stringify(payload));
        putReq.end();
    });
});

req.on('error', (e) => {
    console.error(`Problema con la petición: ${e.message}`);
});

req.end();
