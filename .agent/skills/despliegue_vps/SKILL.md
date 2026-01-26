---
name: Despliegue VPS Automatizado
description: Habilidad para configurar un pipeline de CI/CD que actualiza un servidor VPS automáticamente tras cada push a GitHub.
---

# Despliegue VPS Automatizado

Esta habilidad configura un flujo de trabajo de GitHub Actions que conecta el repositorio con un servidor VPS.

## Objetivos
1.  Crear un archivo de flujo de trabajo `.github/workflows/deploy.yml`.
2.  Configurar la transferencia de archivos segura mediante `rsync` sobre SSH.
3.  Guiar al usuario para configurar los "Secretos" necesarios en GitHub.

## Instrucciones de Uso

### 1. Generar Configuración
Ejecuta esta habilidad para crear el archivo de configuración en tu proyecto.
El agente debe copiar el template `templates/main.yml` a `.github/workflows/deploy.yml`.

### 2. Configurar Secretos en GitHub
El usuario debe ir a `Settings > Secrets and variables > Actions` en su repositorio y agregar:
*   `VPS_HOST`: La IP de tu servidor (ej. 62.84.189.155)
*   `VPS_USER`: Tu usuario SSH (ej. root)
*   `VPS_SSH_KEY`: Tu llave privada SSH (contenido de .pem o id_rsa)

### 3. Verificar Permisos
Asegúrate de que el usuario del VPS tenga permisos de escritura en la carpeta destino (ej. `/var/www/html`).

## Comandos Típicos
*   `mkdir -p .github/workflows`
*   `cp .agent/skills/despliegue_vps/templates/main.yml .github/workflows/deploy.yml`
