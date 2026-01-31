import json

try:
    try:
        with open('workflow_check.json', 'r', encoding='utf-16') as f:
            data = json.load(f)
    except Exception:
        with open('workflow_check.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            
    content = json.dumps(data)
    if "1tIqYM9A0fQFF2KILaT204j_07bQ-TtLv" in content:
        print("Success: New link found in workflow.")
    else:
        print("Failure: New link NOT found.")
        
except Exception as e:
    print(f"Error: {e}")
