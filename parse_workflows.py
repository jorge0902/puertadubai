import json

try:
    try:
        with open('workflows.json', 'r', encoding='utf-16') as f:
            data = json.load(f)
    except Exception:
        with open('workflows.json', 'r', encoding='utf-8') as f:
            data = json.load(f)

    workflows = data.get('data', [])
    print(f"Found {len(workflows)} workflows.")

    for wf in workflows:
        name = wf.get('name', '')
        if 'isabel' in name.lower() or 'registro' in name.lower():
            print(f"ID: {wf['id']}, Name: {name}, Active: {wf['active']}")

except Exception as e:
    print(f"Error: {e}")
