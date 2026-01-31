import json

try:
    with open('proper_encoding_exec.json', 'r', encoding='utf-16') as f:
        data = json.load(f)
    
    # We want to see the parameters used in Gmail or Evolution API
    # Since we can't easily parse deep structure without knowing where it is, let's just dump the whole thing to string and check substring.
    
    # Find the node runs
    run_data = data.get('data', [])[0].get('data', {}).get('resultData', {}).get('runData', {})
    
    gmail_node = run_data.get('Gmail SMTP', [])
    evo_node = run_data.get('Evolution API Final', [])
    
    if gmail_node:
        html = gmail_node[0]['data']['main'][0][0]['json'].get('html', '')
        # print("Gmail HTML snippet:", html[:100])
        if "alegría" in html:
             print("Gmail: alegrí a FOUND")
        else:
             print("Gmail: alegría NOT FOUND. Snippet around 'alegr':")
             try:
                 idx = html.find('alegr')
                 if idx != -1:
                     print(repr(html[idx:idx+20]))
                 else:
                     print("Could not find 'alegr' substring.")
             except: pass

    if evo_node:
        json_body = evo_node[0]['data']['main'][0][0]['json'].get('jsonBody', '')
        if "alegría" in json_body or "alegr\\u00eda" in json_body: # check escaped too if it's a stringified json
             print("Evolution: alegría FOUND")
        else:
             print("Evolution: alegría NOT FOUND in jsonBody.")
             # print(repr(json_body[:200]))

except Exception as e:
    print(f"Error: {e}")
