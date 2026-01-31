import json

def fix_string(s):
    try:
        fixed = s.encode('cp437').decode('utf-8')
        if fixed != s:
            return fixed
        return s
    except Exception:
        return s

try:
    try:
        with open('workflow_broken.json', 'r', encoding='utf-16') as f:
            data = json.load(f)
    except Exception:
        with open('workflow_broken.json', 'r', encoding='utf-8') as f:
            data = json.load(f)

    # Find the string containing "Hola"
    found = False
    
    def search(obj):
        global found
        if isinstance(obj, dict):
            for k, v in obj.items():
                search(v)
        elif isinstance(obj, list):
            for x in obj:
                search(x)
        elif isinstance(obj, str):
            if "Hola" in obj:
                print(f"Found string with 'Hola': {repr(obj)}")
                fixed = fix_string(obj)
                print(f"Fixed version: {repr(fixed)}")
                if fixed != obj:
                    print("Fix changed the string!")
                else:
                    print("Fix did NOT change the string.")
                    # Let's try to see why
                    try:
                        encoded = obj.encode('cp437')
                        print(f"Encoded to cp437: {encoded}")
                        decoded = encoded.decode('utf-8')
                        print(f"Decoded from utf-8: {decoded}")
                    except Exception as e:
                        print(f"Encoding failed: {e}")

    search(data)

except Exception as e:
    print(f"Error: {e}")
