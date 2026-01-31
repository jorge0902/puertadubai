import json

try:
    with open('final_fix_workflow.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Valid fields for PUT /workflows/{id} usually: name, nodes, connections, settings, staticData, pinData, tags
    # We should exclude: id, active, createdAt, updatedAt, etc. if they are part of the root object.
    
    allowed_keys = ['name', 'nodes', 'connections', 'settings']
    cleaned_data = {k: v for k, v in data.items() if k in allowed_keys}
    
    with open('upload_workflow.json', 'w', encoding='utf-8') as f:
        json.dump(cleaned_data, f, indent=4)
        
    print("Successfully created clean_workflow.json")

except Exception as e:
    print(f"Error: {e}")
