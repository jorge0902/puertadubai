import json
import re

try:
    with open('clean_workflow.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    nodes = data.get('nodes', [])
    updated_count = 0
    
    # Logic: Replace specific patterns in Gmail and WhatsApp nodes with PrimerNombre reference
    
    # Target replacement string
    primer_nombre_ref = "{{ $node['Adaptador Web'].json.body.PrimerNombre }}"
    
    for node in nodes:
        if node['name'] == 'Gmail SMTP':
            print("Updating Gmail SMTP node...")
            # Update HTML
            html = node['parameters'].get('html', '')
            # Regex to find the complex name expression
            # It looks like: {{ ($json.nombre || ...).toString()... }}
            # We'll just replace the specific block we know or use a robust regex
            
            # Pattern: {{[^}]+Nombre[^}]+}} matches the interpolation block
            # But the specific string is quite long. Let's do a replace of the known string first.
            old_str = r"{{ ($json.nombre || $node['Webhook'].json.body.Nombre || 'Futuro Residente').toString().toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) }}"
            old_str2 = r"{{ ($json.nombre || $node['Webhook'].json.body.Nombre || 'Futuro Residente').toString().toLowerCase().replace(/\\b\\w/g, l => l.toUpperCase()) }}" # Escaped backslashes
            
            # Also the simpler one in WhatsApp
            # {{ ($json.whatsapp || ...).toString().replace ... }}
            
            # Let's read the file content to see exact string in Python representation
            pass

    # Actually, simplistic replace on the whole file content might be safer if unique enough, 
    # but let's do node-based.
            
    # Re-reading to check exact content in memory
    # The clean_workflow.json has:
    # "html": "=<div ... <strong>{{ $node['Adaptador Web'].json.body.PrimerNombre }}</strong>! ...
    # Wait, I am writing the script to DO this.
    
    for node in nodes:
        if node['name'] == 'Gmail SMTP':
            # Update HTML
            # Replace the Name expression
            # We can replace the whole interpolation binding if we match the start
            current_html = node['parameters']['html']
            # Regex to replace {{ ... Nombre ... }} inside <strong> tags?
            # <strong>{{ ... }}</strong>
            
            new_html = re.sub(r"<strong>\{\{.+?\}\}</strong>", f"<strong>{primer_nombre_ref}</strong>", current_html)
            node['parameters']['html'] = new_html
            updated_count += 1
            
        elif node['name'] == 'Evolution API Final':
            print("Updating Evolution API Final node...")
            # Update jsonBody
            json_body = node['parameters'].get('jsonBody', '')
            # Search for "text": "¡Hola, {{ ... }}!
            # Pattern: ¡Hola, {{ .+? }}!
            
            # Need to be careful with JSON structure inside string
            # "text": "¡Hola, {{ ... }}!
            
            new_body = re.sub(r"¡Hola, \{\{ .+? \}\}!", f"¡Hola, {primer_nombre_ref}!", json_body)
            node['parameters']['jsonBody'] = new_body
            updated_count += 1
            
    with open('final_fix_workflow.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)
        
    print(f"Updated {updated_count} nodes.")

except Exception as e:
    print(f"Error: {e}")
