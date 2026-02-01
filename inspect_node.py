import json

def run():
    try:
        try:
            with open('workflow_debug.json', 'r', encoding='utf-16') as f:
                data = json.load(f)
        except:
             with open('workflow_debug.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
                
        nodes = data.get('nodes', [])
        for node in nodes:
            if node['name'] == 'Evolution API Final':
                print(f"Node: {node['name']}")
                print(f"  Type: {node['type']}")
                print(f"  Credentials: {node.get('credentials')}")
                print(f"  Parameters Auth: {node['parameters'].get('authentication')}")
                print(f"  Parameters CredType: {node['parameters'].get('nodeCredentialType')}")
                print("  Full Parameters keys:", list(node['parameters'].keys()))
                
    except Exception as e:
        print(e)

if __name__ == '__main__':
    run()
