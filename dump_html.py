import json

try:
    try:
        with open('workflow_detail.json', 'r', encoding='utf-16') as f:
            data = json.load(f)
    except Exception:
        with open('workflow_detail.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            
    nodes = data.get('nodes', [])
    for node in nodes:
        if node.get('name') == 'Gmail SMTP':
            params = node.get('parameters', {})
            if 'html' in params:
                with open('gmail_node.html', 'w', encoding='utf-8') as f:
                    f.write(params['html'])
                print("Saved HTML to gmail_node.html")
except Exception as e:
    print(f"Error: {e}")
