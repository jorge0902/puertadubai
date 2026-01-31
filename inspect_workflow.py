import json
import re

try:
    try:
        with open('workflow_detail.json', 'r', encoding='utf-16') as f:
            data = json.load(f)
    except Exception:
        with open('workflow_detail.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
    
    nodes = data.get('nodes', [])
    found = False
    
    for node in nodes:
        print(f"Node: {node['name']} ({node['type']})")
        if node.get('type') == 'n8n-nodes-base.gmail' or node.get('type') == 'n8n-nodes-base.emailSend':
            params = node.get('parameters', {})
            print("  Params keys:", params.keys())
            if 'html' in params:
                 print("  HTML snippet:", str(params['html'])[:200])
            if 'content' in params:
                 print("  Content snippet:", str(params['content'])[:200])

except Exception as e:
    print(f"Error: {e}")
