import json

def run():
    # 1. Check Workflow Config (Credentials)
    try:
        # PowerShell redirects are often UTF-16 LE
        try:
            with open('workflow_debug.json', 'r', encoding='utf-16') as f:
                wf = json.load(f)
        except:
            with open('workflow_debug.json', 'r', encoding='utf-8') as f:
                wf = json.load(f)
        
        print("--- Workflow Config Check ---")
        nodes = wf.get('nodes', [])
        for node in nodes:
            if node['name'] in ['Notify Jorge', 'Notify Isa']:
                print(f"Node: {node['name']}")
                print(f"  Creds: {node.get('credentials')}")
                print(f"  Url: {node['parameters'].get('url')}")
    except Exception as e:
        print(f"Error reading workflow: {e}")

    # 2. Check Execution Logs
    try:
        try:
            with open('recent_executions.json', 'r', encoding='utf-16') as f:
                execs = json.load(f)
        except:
            with open('recent_executions.json', 'r', encoding='utf-8') as f:
                execs = json.load(f)
            
        print("\n--- Recent Executions Analysis ---")
        data = execs.get('data', [])
        if not data:
            print("No executions found.")
        
        for exc in data:
            xc_id = exc.get('id')
            status = exc.get('finished')
            print(f"Execution ID: {xc_id} (Finished: {status})")
            
            # Check for errors in result data
            result_data = exc.get('data', {}).get('resultData', {})
            run_data = result_data.get('runData', {})
            
            for node_name, node_runs in run_data.items():
                if node_name in ['Notify Jorge', 'Notify Isa']:
                    # each node run is a list of attempts/items
                    for run_item in node_runs:
                        # Check for error
                        if 'error' in run_item:
                            print(f"  ERROR in {node_name}: {run_item['error']}")
                        elif 'data' in run_item and 'main' in run_item['data']:
                            # Successful run?
                             print(f"  Success in {node_name}")
                        else:
                             print(f"  Unknown status in {node_name}")
                        
                        # Inspect output if possible (often truncated in list view, need full exec but let's see)

    except Exception as e:
        print(f"Error reading executions: {e}")

if __name__ == '__main__':
    run()
