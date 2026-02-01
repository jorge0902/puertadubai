import json

def run():
    try:
        try:
            with open('workflow_debug.json', 'r', encoding='utf-16') as f:
                data = json.load(f)
        except:
             with open('workflow_debug.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
    except Exception as e:
        print(f"Failed to load workflow: {e}")
        return

    nodes = data.get('nodes', [])
    
    # 1. Get Headers from Source
    source_node = next((n for n in nodes if n['name'] == 'Evolution API Final'), None)
    if not source_node:
        print("Error: 'Evolution API Final' not found")
        return
        
    headers = source_node['parameters'].get('headerParameters')
    print(f"Found headers: {headers}")
    
    # 2. Apply to Admin Nodes
    for node in nodes:
        if node['name'] in ['Notify Jorge', 'Notify Isa']:
            print(f"Appying headers to {node['name']}...")
            node['parameters']['authentication'] = 'none' # Ensure none
            node['parameters']['sendHeaders'] = True
            node['parameters']['headerParameters'] = headers
            
            # Ensure sendBody is still there (re-applying just in case)
            node['parameters']['sendBody'] = True
            node['parameters']['contentType'] = 'json'
            
    # Clean keys for upload
    allowed_keys = ['name', 'nodes', 'connections', 'settings']
    cleaned_data = {k: v for k, v in data.items() if k in allowed_keys}
    
    with open('workflow_admin_final_fixed.json', 'w', encoding='utf-8') as f:
        json.dump(cleaned_data, f, indent=4, ensure_ascii=True)
        
    print("Saved workflow_admin_final_fixed.json")

if __name__ == '__main__':
    run()
