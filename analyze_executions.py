import json

try:
    with open('executions.json', 'r', encoding='utf-16') as f:
        data = json.load(f)
    print(data)
        
    executions = data.get('data', [])
    print(f"Found {len(executions)} executions.")
    
    for exc in executions:
        print(f"ID: {exc['id']}")
        print(f"Started At: {exc['startedAt']}")
        print(f"Status: {exc['finished'] and 'Finished' or 'Running'} - Success: {not exc.get('stoppedAt')}") # simplified
        if 'data' in exc:
             print(f"Result Data Key Present")
        # In the summary list, we might not get full error details, but let's see what we have.
        # Usually list endpoint returns minimal info. We might need to fetch individual execution.
        print(json.dumps(exc, indent=2))
        print("-" * 20)

except Exception as e:
    print(f"Error: {e}")
