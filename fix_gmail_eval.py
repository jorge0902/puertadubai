import json
import os

filename = 'gmail_fix_start.json'

# Handle encoding and read workflow
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
fixed = False

for node in nodes:
    if node['name'] == 'Gmail SMTP':
        html = node['parameters'].get('html', '')
        # Prepend '=' if not present, ensuring expression mode in n8n
        if not html.startswith('='):
            print("Prepending '=' to Gmail HTML parameter.")
            node['parameters']['html'] = "=" + html
            fixed = True
        else:
            print("Gmail HTML already starts with '='.")

if fixed:
    # Clean for upload
    allowed_keys = ['name', 'nodes', 'connections', 'settings']
    cleaned_data = {k: v for k, v in data.items() if k in allowed_keys}
    
    with open('gmail_fix_ready.json', 'w', encoding='utf-8') as f:
        json.dump(cleaned_data, f, indent=4, ensure_ascii=True)
    print("Saved gmail_fix_ready.json")
else:
    print("No fix needed.")
