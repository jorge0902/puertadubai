import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

def fix_string(s):
    if not isinstance(s, str):
        return s
    
    try:
        fixed = s.encode('cp437').decode('utf-8')
        if fixed != s:
            return fixed
        return s
    except Exception:
        return s

def recursive_fix(obj, changed_flag):
    if isinstance(obj, dict):
        new_obj = {}
        for k, v in obj.items():
            res, changed = recursive_fix(v, changed_flag)
            new_obj[k] = res
            if changed:
                changed_flag[0] = True
        return new_obj, changed_flag[0]
    elif isinstance(obj, list):
        new_list = []
        for x in obj:
            res, changed = recursive_fix(x, changed_flag)
            new_list.append(res)
            if changed:
                changed_flag[0] = True
        return new_list, changed_flag[0]
    elif isinstance(obj, str):
        fixed = fix_string(obj)
        if fixed != obj:
            changed_flag[0] = True
            return fixed, True
        return obj, False
    else:
        return obj, False

ALLOWED_KEYS = {'name', 'nodes', 'connections', 'settings'}

try:
    print("Reading workflow_broken.json...")
    try:
        with open('workflow_broken.json', 'r', encoding='utf-16') as f:
            data = json.load(f)
    except Exception:
        with open('workflow_broken.json', 'r', encoding='utf-8') as f:
            data = json.load(f)

    # Clean top keys first to avoid processing unnecessary data
    cleaned_data = {k: v for k, v in data.items() if k in ALLOWED_KEYS}

    iteration = 0
    max_iterations = 5
    
    while iteration < max_iterations:
        iteration += 1
        print(f"--- Iteration {iteration} ---")
        changed_flag = [False]
        # We need a wrapper because recursive_fix tuple return is awkward for top level
        # Actually I'll just rewrite logic slightly to be cleaner
        
        # Simplified approach: serialize to string, fix string, deserialize?
        # No, that's dangerous for JSON syntax characters.
        # Let's use the recursive object walker.
        
        cleaned_data, changed = recursive_fix(cleaned_data, changed_flag)
        
        if not changed_flag[0]:
            print("No more changes. Stabilized.")
            break
        else:
            print("Changes detected. looping...")

    # Verification: check a known string
    s_dump = json.dumps(cleaned_data, ensure_ascii=False)
    if "¡Hola" in s_dump:
        print("Verification: Found '¡Hola'")
    else:
        print("Verification WARNING: '¡Hola' NOT found")

    print("Saving to workflow_fixed.json...")
    with open('workflow_fixed.json', 'w', encoding='utf-8') as f:
        json.dump(cleaned_data, f, indent=2, ensure_ascii=False)
        
    print("Done.")

except Exception as e:
    print(f"Error: {e}")
