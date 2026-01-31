import json

def run():
    filename = 'workflow_admin_fix_start.json'
    
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
    
    # 1. Update Admin Nodes
    for node in nodes:
        if node['name'] in ['Notify Jorge', 'Notify Isa']:
            # Enable Send Body
            node['parameters']['sendBody'] = True
            node['parameters']['contentType'] = 'json'
            # Check jsonBody is present (it should be from previous step)
            if 'jsonBody' not in node['parameters']:
                print(f"Warning: jsonBody missing in {node['name']}")

    # 2. Reconnect to 'Adaptador Web'
    # Start by removing them from 'Supabase' outputs or wherever they are
    # Connections structure: { "SourceNode": { "main": [ [ {node: "DestNode", ...} ] ] } }
    
    # Remove from Supabase
    if 'Supabase' in connections:
        main_outputs = connections['Supabase']['main']
        # Iterate and remove. Main outputs is a list of lists.
        # Usually index 0 list contains the destinations.
        # We need to filter out Notify Jorge/Isa from that list.
        if len(main_outputs) > 0:
            destinations = main_outputs[0]
            # detailed filter
            new_destinations = [d for d in destinations if d['node'] not in ['Notify Jorge', 'Notify Isa']]
            main_outputs[0] = new_destinations

    # Add to Adaptador Web
    # Adaptador Web -> Validar Inputs
    # We want to add parallel connections.
    if 'Adaptador Web' in connections:
        main_outputs = connections['Adaptador Web']['main']
        if len(main_outputs) > 0:
            # Append to existing list at index 0
            main_outputs[0].append({"node": "Notify Jorge", "type": "main", "index": 0})
            main_outputs[0].append({"node": "Notify Isa", "type": "main", "index": 0})
        else:
            # Should exist if it connects to Validar Inputs
            pass
    
    # Save
    allowed_keys = ['name', 'nodes', 'connections', 'settings']
    cleaned_data = {k: v for k, v in data.items() if k in allowed_keys}
    
    with open('workflow_admin_ready.json', 'w', encoding='utf-8') as f:
        json.dump(cleaned_data, f, indent=4, ensure_ascii=True)
        
    print("Successfully created workflow_admin_ready.json")

if __name__ == '__main__':
    run()
