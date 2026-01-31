import json

try:
    with open('workflows.json', 'r', encoding='utf-16') as f:
        data = json.load(f)
        
    workflows = data.get('data', [])
    found = False
    for w in workflows:
        if 'isabel' in w['name'].lower():
            print(f"Found: {w['name']} - ID: {w['id']}")
            found = True
            
    if not found:
        print("No workflow with 'isabel' found.")
        print("Available workflows:")
        for w in workflows:
            print(f"- {w['name']}")

except Exception as e:
    print(f"Error: {e}")
