import json

try:
    with open('workflow_fixed.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    s = json.dumps(data, ensure_ascii=False)
    
    if "¡Hola" in s:
        print("Success: found '¡Hola'")
    else:
        print("Failure: '¡Hola' not found")
        
    if "🚨" in s:
        print("Success: found '🚨'")
    else:
        print("Failure: '🚨' not found")
        
    if "┬íHola" in s:
        print("Warning: found '┬íHola' (broken artifact still present)")
    else:
        print("Success: '┬íHola' gone")

except Exception as e:
    print(f"Error: {e}")
