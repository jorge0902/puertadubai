import json

try:
    with open('check_status.json', 'r', encoding='utf-16') as f:
        data = json.load(f)
        
    print(f"ID: {data.get('id')}")
    print(f"Name: {data.get('name')}")
    print(f"Active: {data.get('active')}")
    
    nodes = data.get('nodes', [])
    for node in nodes:
        if node['type'] == 'n8n-nodes-base.webhook':
            print(f"Webhook Node Name: {node['name']}")
            print(f"Webhook ID: {node.get('webhookId')}")
            print(f"Path: {node['parameters'].get('path')}")
            print(f"Method: {node['parameters'].get('httpMethod')}")

except Exception as e:
    print(f"Error: {e}")
