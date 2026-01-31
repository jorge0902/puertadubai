
import json
import re

# Load the workflow
with open('current_workflow.json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# 1. Modify "Adaptador Web" to extract First Name
for node in workflow['nodes']:
    if node['name'] == 'Adaptador Web':
        js_code = node['parameters']['jsCode']
        insertion_point = "return {"
        new_logic = """
// Extraer primer nombre
const nombreCompleto = getBodyVal('nombre') || getBodyVal('Nombre') || getBodyVal('name') || getVal('nombre completo');
const primerNombre = nombreCompleto ? nombreCompleto.split(' ')[0] : '';
"""
        new_return = """return {
  json: {
    body: {
      PrimerNombre: primerNombre,"""
      
        if "const primerNombre" not in js_code:
            node['parameters']['jsCode'] = js_code.replace("return {", new_logic + new_return)
            print("Modified Adaptador Web")

# 2. Modify "Gmail SMTP" to use PrimerNombre
for node in workflow['nodes']:
    if node['name'] == 'Gmail SMTP':
        html_content = node['parameters']['html']
        # Use regex to replace the greeting
        # Pattern: ¡Hola <strong>.*?</strong>!
        new_greeting = "¡Hola <strong>{{ $node['Adaptador Web'].json.body.PrimerNombre }}</strong>!"
        
        # We need to be careful not to replace other things, but there is only one greeting like this.
        # The original has a complex expression inside <strong>
        
        if "¡Hola <strong>{{ $node['Adaptador Web'].json.body.PrimerNombre }}</strong>!" not in html_content:
            # Regex match for the bold part
            html_content = re.sub(r"¡Hola <strong>.*?</strong>!", new_greeting, html_content)
            node['parameters']['html'] = html_content
            print("Modified Gmail SMTP")

# 3. Modify "Evolution API Final" (WhatsApp)
for node in workflow['nodes']:
    if node['name'] == 'Evolution API Final':
        json_body = node['parameters']['jsonBody']
        
        # We want to replace:
        # ¡Hola, {{ ... }}!
        # with:
        # ¡Hola *{{ $node['Adaptador Web'].json.body.PrimerNombre }}*!
        
        # The key is finding the complex expression.
        # It contains "replace(/\b\w/g" which in python string is "replace(/\\b\\w/g"
        
        # Let's try splitting by "¡Hola, " and "! ✨" if possible, or just regex.
        # The message starts with: "text": "¡Hola, {{ ... }}! ✨
        
        # Regex pattern:
        # "text": "¡Hola, .*?!
        
        # Note: jsonBody is a string, so we are doing string replacement.
        
        new_wa_greeting = '\\"text\\": \\"¡Hola *{{ $node[\'Adaptador Web\'].json.body.PrimerNombre }}*!'
        
        # Be careful with quotes. The jsonBody string has escaped quotes for keys/values.
        # "text": "¡Hola, ...
        
        # Let's try to match the specific complex expression again, but extremely carefully.
        # The expression in the file is:
        # {{ ($json.nombre || $json.body.Nombre || $node['Webhook'].json.body.Nombre).toString().toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) }}
        
        # Convert to Python string literal for matching:
        target_expr = "{{ ($json.nombre || $json.body.Nombre || $node['Webhook'].json.body.Nombre).toString().toLowerCase().replace(/\\b\\w/g, l => l.toUpperCase()) }}"
        
        if target_expr in json_body:
            # We want to replace "¡Hola, TARGET!" with "¡Hola *PRIMERNOMBRE*!"
            # Note the comma in original "¡Hola, " vs user request "¡Hola *...*!" (no comma mentioned, but let's keep it clean)
            # User example: ¡Hola {{ primer_nombre }}!
            # So I will remove the comma if it exists in my replacement just to be cleaner or keep?
            # User said: "¡Hola {{ primer_nombre }}!"
            
            # Original: "¡Hola, {{ ... }}!"
            # Replacement: "¡Hola *{{ ... }}*!"
            
            # So I replace ", " + target_expr with " *" + new + "*"
            
            replacement = "*{{ $node['Adaptador Web'].json.body.PrimerNombre }}*"
            
            # Replace ", " + target_expr
            # Be careful if comma is not there.
            
            if ", " + target_expr in json_body:
                 node['parameters']['jsonBody'] = json_body.replace(", " + target_expr, " " + replacement)
                 print("Modified Evolution API Final (with comma)")
            else:
                 node['parameters']['jsonBody'] = json_body.replace(target_expr, replacement)
                 print("Modified Evolution API Final (direct)")
        else:
            print("Could not find WhatsApp target expression. Dumping snippet for debug:")
            print(json_body[:200])

# Save
with open('workflow_updated.json', 'w', encoding='utf-8') as f:
    json.dump(workflow, f, indent=2)

print("\nSaved workflow_updated.json")
