import json

ALLOWED_KEYS = {'name', 'nodes', 'connections', 'settings'}

try:
    with open('workflow_updated.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    cleaned_data = {k: v for k, v in data.items() if k in ALLOWED_KEYS}
    
    with open('workflow_clean.json', 'w', encoding='utf-8') as f:
        json.dump(cleaned_data, f, indent=2)
        
    print(f"Cleaned workflow JSON. Removed keys: {set(data.keys()) - ALLOWED_KEYS}")
    
except Exception as e:
    print(f"Error: {e}")
