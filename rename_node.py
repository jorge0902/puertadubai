import json

try:
    with open('workflow_fixed.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    nodes = data.get('nodes', [])
    renamed = False
    
    for node in nodes:
        if node.get('name') == 'Tally Adapter':
            node['name'] = 'Adaptador Web'
            renamed = True
            print("Renamed 'Tally Adapter' to 'Adaptador Web'")
            
    # Also need to update connections if the name is used as a key there
    connections = data.get('connections', {})
    new_connections = {}
    
    for node_name, conns in connections.items():
        # If the key is the old name, change it
        new_key = 'Adaptador Web' if node_name == 'Tally Adapter' else node_name
        
        # Now iterate through the connections list
        # detailed structure: { "Main": [ [ { "node": "TargetNode", ... } ] ] }
        # The structure given in previous view_file was:
        # "connections": { "SourceNode": { "main": [ [ { "node": "TargetNode", ... } ] ] } }
        
        new_conns = {}
        for conn_type, conn_list in conns.items():
            new_conn_list = []
            for sublist in conn_list:
                new_sublist = []
                for item in sublist:
                    if item.get('node') == 'Tally Adapter':
                        item['node'] = 'Adaptador Web'
                        renamed = True # usage found
                    new_sublist.append(item)
                new_conn_list.append(new_sublist)
            new_conns[conn_type] = new_conn_list
            
        new_connections[new_key] = new_conns
        
    data['connections'] = new_connections

    if renamed:
        with open('workflow_renamed.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print("Saved workflow_renamed.json")
    else:
        print("Node 'Tally Adapter' not found or no changes needed.")

except Exception as e:
    print(f"Error: {e}")
