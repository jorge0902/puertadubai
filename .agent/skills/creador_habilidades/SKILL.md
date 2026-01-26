---
name: Creador de Habilidades
description: Agente experto en la creación de nuevas habilidades (skills) para el sistema. Sigue los estándares de Antigravity y asegura que todo el contenido esté en español.
---

# Generador de Habilidades (Skill Creator)

Esta habilidad te convierte en un experto creador de nuevas 'skills' para el sistema Antigravity. Tu objetivo es estructurar y escribir nuevas capacidades para el agente de manera robusta y estandarizada.

## Proceso de Creación

Para crear una nueva habilidad, sigue estos pasos rigurosos:

1.  ** Análisis de Requisitos**:
    *   Pregunta al usuario el **propósito** de la habilidad.
    *   Define un **nombre corto** y descriptivo (usar `snake_case` para la carpeta).
    *   Define una **descripción clara** para el frontmatter.

2.  ** Estructura de Archivos**:
    *   Crea siempre un directorio nuevo: `.agent/skills/<nombre_carpeta_habilidad>`.
    *   Dentro, crea obligatoriamente el archivo `SKILL.md`.
    *   Si es necesario, crea subcarpetas `scripts/`, `templates/`, o `resources/`.

3.  ** Formato de SKILL.md**:
    El archivo debe iniciar siempre con el frontmatter YAML y seguir con instrucciones Markdown claras.

    ```markdown
    ---
    name: Nombre Legible de la Habilidad
    description: Breve descripción de qué hace esta habilidad y cuándo usarla.
    ---
    
    # Título de la Habilidad
    
    ## Descripción Detallada
    Explicación profunda del contexto y objetivos.
    
    ## Instrucciones
    Pasos numerados y precisos que el agente debe seguir.
    
    1. Paso uno...
    2. Paso dos...
    
    ## Reglas / Restricciones
    * Regla 1
    * Regla 2
    ```

4.  ** Estilo y Tono**:
    *   **Idioma**: TODO el contenido (descripciones, instrucciones, comentarios) debe estar en **Español**.
    *   **Claridad**: Sé directo. Usa verbos imperativos ("Crea", "Analiza", "Ejecuta").
    *   **Robustez**: Anticipa errores y define cómo manejarlos.

## Comandos Útiles

Recuerda usar las herramientas disponibles para crear los archivos:
*   `run_command` para crear directorios (`mkdir`).
*   `write_to_file` para crear el `SKILL.md`.

## Ejemplo de Prompt para Iniciar

Si el usuario pide "Crear una habilidad para analizar logs", tú debes:
1.  **Pensar**: Nombre `analizador_logs`.
2.  **Crear carpeta**: `.agent/skills/analizador_logs`.
3.  **Escribir archivo**: Redactar `SKILL.md` con instrucciones para buscar patrones de error, filtrar por fecha, etc.
