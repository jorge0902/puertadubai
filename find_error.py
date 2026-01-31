import json

try:
    with open('execution_2039_full.json', 'r', encoding='utf-16') as f:
        data = json.load(f)
    
    exec_data = data.get('data', {}).get('resultData', {}).get('runData', {})
    
    if not exec_data:
         # Try alternative structure depending on n8n version
        exec_data = data.get('executionData', {}).get('resultData', {}).get('runData', {})

    found_error = False
    for node_name, node_runs in exec_data.items():
        for run in node_runs:
            if 'error' in run:
                print(f"Error in node: {node_name}")
                print(json.dumps(run['error'], indent=2))
                found_error = True
    
    if not found_error:
        print("No specific error object found in runData.")
        # Check if status is error but no error object (maybe stopped)
        print(f"Execution Status: {data.get('status')}")
        print(f"Stopped At: {data.get('stoppedAt')}")

except Exception as e:
    print(f"Error: {e}")
