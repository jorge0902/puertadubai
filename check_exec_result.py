import json

try:
    with open('latest_execution.json', 'r', encoding='utf-16') as f:
        data = json.load(f)
    
    exec_data = data.get('data', [])[0] # List wrapper from /executions endpoint? No, we used limit=1 but list format.
    
    # Structure of /executions response with includeData=true is { "data": [ { "id": ..., "data": { "resultData": { "runData": ... } } } ] }
    # Or for list endpoint it might be simpler? Let's check keys.
    # print(exec_data.keys())
    
    run_data = exec_data.get('data', {}).get('resultData', {}).get('runData', {})
    
    adapter_runs = run_data.get('Adaptador Web', []) or run_data.get('Tally Adapter', [])
    if adapter_runs:
        output = adapter_runs[0].get('data', {}).get('main', [])[0][0].get('json', {}).get('body', {})
        print("Adaptador Web Output:")
        print(f"Nombre: {output.get('Nombre')}")
        print(f"PrimerNombre: {output.get('PrimerNombre')}")
        print(f"WhatsApp: {output.get('WhatsApp')}")
        print(f"Email: {output.get('Email')}")
    else:
        print("Adaptador Web did not run or no data found.")

except Exception as e:
    print(f"Error: {e}")
