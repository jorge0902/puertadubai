---
name: Gestor n8n
description: Habilidad para interactuar con la API de n8n, permitiendo obtener y actualizar workflows programáticamente.
---

# Gestor n8n (n8n Manager)

Esta habilidad permite administrar workflows en una instancia de n8n, superando las limitaciones de solo lectura. Su función principal es permitir la edición remota de nodos y configuraciones JSON.

## Prerrequisitos
Para usar esta herramienta, necesitas una **API Key** de n8n.
1. Ve a tu n8n > Settings > Public API.
2. Crea una API Key.

## Instrucciones de Uso

### 1. Actualizar un Workflow
Usa el script `update_workflow.js` para inyectar un nuevo JSON en un workflow existente.

**Comando:**
```bash
node .agent/skills/gestor_n8n/scripts/update_workflow.cjs --id <WORKFLOW_ID> --apiKey <TU_API_KEY> --json <RUTA_AL_NUEVO_JSON>
```

### 2. Obtener JSON de un Workflow
```bash
node .agent/skills/gestor_n8n/scripts/get_workflow.cjs --id <WORKFLOW_ID> --apiKey <TU_API_KEY>
```

## Estructura del Script
El script realiza una petición `PUT` al endpoint `/workflows/{id}`.
Asegúrate de que el JSON proporcionado tenga la estructura completa `{ "nodes": [...], "connections": {...} }` o la parte específica que el script sepa manejar.
