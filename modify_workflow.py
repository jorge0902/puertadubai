import json
import re

TARGET_LINK = "https://drive.google.com/uc?export=download&id=1tIqYM9A0fQFF2KILaT204j_07bQ-TtLv"
OLD_LINK = "https://soytu.puertadubai.online/catalogo.pdf"

try:
    try:
        with open('workflow_detail.json', 'r', encoding='utf-16') as f:
            data = json.load(f)
    except Exception:
        with open('workflow_detail.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            
    nodes = data.get('nodes', [])
    modified = False
    
    for node in nodes:
        if node.get('name') == 'Gmail SMTP':
            params = node.get('parameters', {})
            if 'html' in params:
                html = params['html']
                if OLD_LINK in html:
                    print(f"Found old link in 'Gmail SMTP'. Replacing...")
                    # HTML escape the ampersand in the new link for the href attribute
                    # actually, simple & usually works in browsers, but let's be strict if we want.
                    # Use the raw link first, user provided it as is.
                    new_html = html.replace(OLD_LINK, TARGET_LINK)
                    params['html'] = new_html
                    modified = True
                else:
                    print("Could not find exact old link. Trying looser match or it might be already updated.")
                    
    if modified:
        with open('workflow_updated.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
        print("Saved modified workflow to workflow_updated.json")
    else:
        print("No changes made.")

except Exception as e:
    print(f"Error: {e}")
