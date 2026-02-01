import json

def run():
    # Load debug workflow
    try:
        # Try diff encodings
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
    
    # 1. Find Source Credentials (Evolution API Final)
    source_node = next((n for n in nodes if n['name'] == 'Evolution API Final'), None)
    if not source_node:
        print("Error: 'Evolution API Final' node not found!")
        return
        
    creds = source_node.get('credentials', {})
    print(f"Found credentials: {creds}")
    
    # Note: HTTP Request node usually has 'authentication' parameter too.
    # Let's check source node parameters for auth type.
    auth_type = source_node['parameters'].get('authentication', 'predefinedCredentialType')
    node_credential_type = source_node['parameters'].get('nodeCredentialType', 'evolutionApi') # Guessing
    
    # Actually, let's just copy exactly what source has for authentication params
    # But wait, source might be 'n8n-nodes-base.httpRequest' or custom?
    # Let's print source type
    print(f"Source Type: {source_node['type']}")
    
    # If both are httpRequest, we can copy creds directly.
    # If Admin nodes are httpRequest, we need to ensure they use the same auth mechanism.
    
    # 2. Apply to Admin Nodes
    count = 0
    for node in nodes:
        if node['name'] in ['Notify Jorge', 'Notify Isa']:
            print(f"Fixing {node['name']}...")
            node['credentials'] = creds
            
            # Use 'predefinedCredentialType' if that's what Evolution uses, or 'headerAuth'
            # We strictly copy relevant auth parameters from source if possible, or force standard if we know it.
            # In previous steps (Conversation 27d2172f), used Header Auth with 'apikey'.
            # BUT here 'Evolution API Final' is working, so let's trust its config.
            
            if 'authentication' in source_node['parameters']:
                node['parameters']['authentication'] = source_node['parameters']['authentication']
            
            # If it uses 'nodeCredentialType' (common in HTTP Request for specific services)
            if 'nodeCredentialType' in source_node['parameters']:
                node['parameters']['nodeCredentialType'] = source_node['parameters']['nodeCredentialType']
                
            count += 1
            
    # Save
    with open('workflow_admin_auth_fixed.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=True)
        
    print(f"Fixed {count} nodes. Saved to workflow_admin_auth_fixed.json")

if __name__ == '__main__':
    run()
