import json

def run():
    filename = 'workflow_check_manual.json'
    
    # Read Logic
    try:
        with open(filename, 'r', encoding='utf-16') as f:
            data = json.load(f)
    except:
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except:
             with open(filename, 'r') as f:
                data = json.load(f)

    nodes = data.get('nodes', [])
    connections = data.get('connections', {})
    
    # Templates
    # User Request: Nombre, Email, Teléfono, Mensaje
    # Variables: 
    # $node['Adaptador Web'].json.body.Nombre
    # $node['Adaptador Web'].json.body.Email
    # $node['Adaptador Web'].json.body.WhatsApp
    # $node['Adaptador Web'].json.body.Interes (as Message/Interest)
    
    msg_template = "🚀 Nuevo Lead Detectado\\n👤 Nombre: {{ $node['Adaptador Web'].json.body.Nombre }}\\n📧 Email: {{ $node['Adaptador Web'].json.body.Email }}\\n📱 WhatsApp: {{ $node['Adaptador Web'].json.body.WhatsApp }}\\n🎯 Interés: {{ $node['Adaptador Web'].json.body.Interes }}"
    
    # Escaping for JSON string inside JSON string
    # We construct the JSON string manually to be safe
    # But since we are modifying a python dict which will be dumped to JSON, we just need the inner string to be valid JSON.
    # The 'jsonBody' parameter in n8n is a STRING that looks like JSON.
    # So we need to escape newlines in the text value.
    
    # Let's clean up variables for the expression
    # We can use the expression directly in the value
    # But n8n expressions inside a string field need to be carefully handled.
    # Easier way: Start with '=' and use javascript object.
    # But simpler: Use the JSON structure.
    
    # Text content with expressions:
    text_content = "🚀 Nuevo Lead Detectado\n👤 Nombre: {{ $node['Adaptador Web'].json.body.Nombre }}\n📧 Email: {{ $node['Adaptador Web'].json.body.Email }}\n📱 WhatsApp: {{ $node['Adaptador Web'].json.body.WhatsApp }}\n🎯 Interés: {{ $node['Adaptador Web'].json.body.Interes }}"
    
    # We need to JSON dump this text content to be safe inside the jsonBody string
    escaped_text = json.dumps(text_content)[1:-1] # Remove surrounding quotes
    
    jorge_number = "971557976925"
    isa_number = "971553945213"
    
    for node in nodes:
        if node['name'] == 'Notify Jorge':
            node['parameters']['sendBody'] = True
            node['parameters']['contentType'] = 'json'
            # Construct body
            # = { "number": "...", "textMessage": { "text": "..." } }
            new_body = '={\n  "number": "' + jorge_number + '",\n  "textMessage": {\n    "text": "' + escaped_text + '"\n  }\n}'
            node['parameters']['jsonBody'] = new_body
            
        if node['name'] == 'Notify Isa':
            node['parameters']['sendBody'] = True
            node['parameters']['contentType'] = 'json'
            new_body = '={\n  "number": "' + isa_number + '",\n  "textMessage": {\n    "text": "' + escaped_text + '"\n  }\n}'
            node['parameters']['jsonBody'] = new_body

    # Connections
    # Ensure they are connected to 'Adaptador Web'
    # First, removing them from anywhere else (like Supabase)
    if 'Supabase' in connections:
        main_outputs = connections['Supabase']['main']
        if len(main_outputs) > 0:
            # Filter out
            new_dests = [d for d in main_outputs[0] if d['node'] not in ['Notify Jorge', 'Notify Isa']]
            main_outputs[0] = new_dests
            
    # Connect to Adaptador Web
    if 'Adaptador Web' in connections:
        main_outputs = connections['Adaptador Web']['main']
        if len(main_outputs) > 0:
            # Check if already present to avoid duplicates
            current_nodes = [d['node'] for d in main_outputs[0]]
            
            if 'Notify Jorge' not in current_nodes:
                main_outputs[0].append({"node": "Notify Jorge", "type": "main", "index": 0})
            
            if 'Notify Isa' not in current_nodes:
                main_outputs[0].append({"node": "Notify Isa", "type": "main", "index": 0})
    
    # Save
    allowed_keys = ['name', 'nodes', 'connections', 'settings']
    cleaned_data = {k: v for k, v in data.items() if k in allowed_keys}
    
    with open('workflow_admin_final.json', 'w', encoding='utf-8') as f:
        json.dump(cleaned_data, f, indent=4, ensure_ascii=True)
        
    print("Successfully created workflow_admin_final.json")

if __name__ == '__main__':
    run()
