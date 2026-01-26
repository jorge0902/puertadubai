---
name: Gestor Evolution API
description: Habilidad para administrar instancias de Evolution API, verificar estados y configurar webhooks.
---

# Gestor Evolution API

Esta habilidad permite interactuar con la Evolution API para gestionar instancias de WhatsApp.

## Capacidades Principales
1.  **Verificar Webhook**: Comprobar si la URL del webhook configurada coincide con la esperada.
2.  **Actualizar Webhook**: Configurar la URL del webhook correcta.
3.  **Consultar Instancia**: Obtener detalles de estado y configuración.

## Instrucciones de Uso

### Verificar y Corregir Webhook
Usa el script `verify_webhook.cjs` para auditar la configuración.

**Comando:**
```bash
node .agent/skills/gestor_evolution/scripts/verify_webhook.cjs --instance <NOMBRE_INSTANCIA> --apiKey <API_KEY> --n8nUrl <URL_N8N_ESPERADA>
```

Este script:
1.  Consulta la configuración de la instancia.
2.  Compara la URL del webhook con la `n8nUrl` proporcionada.
3.  Si son diferentes, actualiza la instancia con la nueva URL (si se pasa el flag `--fix`).

## Requisitos
*   URL base de Evolution API (por defecto: `http://62.84.189.155:8080`)
*   API Key de la instancia (o Global API Key si es necesario para ciertas acciones).
