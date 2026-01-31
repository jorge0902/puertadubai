import sqlite3
import json

db_path = "n8n_database.sqlite"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

print("--- Searching for workflows ---")
cursor.execute("SELECT id, name, nodes FROM workflow_entity WHERE name LIKE '%registro%' OR name LIKE '%Isabel%'")
rows = cursor.fetchall()

target_workflow_id = None
new_nodes_json = None

for row in rows:
    wf_id, name, nodes_str = row
    print(f"Found Workflow: ID={wf_id}, Name={name}")
    
    # Looking for the one with Gmail node and email content
    if "Gmail" in nodes_str or "Email" in nodes_str:
        print("  -> Contains Email/Gmail node")
        nodes = json.loads(nodes_str)
        updated = False
        
        for node in nodes:
            if node['type'] in ['n8n-nodes-base.gmail', 'n8n-nodes-base.emailSend']:
                print(f"  -> Inspecting node: {node['name']} ({node['type']})")
                # Check parameters for HTML content
                params = node.get('parameters', {})
                content = params.get('htmlContent') or params.get('html')
                
                if content:
                    print("  -> Found HTML content.")
                    # Replace the link or button href
                    # The goal is to set the button href to: https://drive.google.com/uc?export=download&id=1tIqYM9A0fQFF2KILaT204j_07bQ-TtLv
                    # We look for 'DESCARGAR CATÁLOGO'
                    if 'DESCARGAR CATÁLOGO' in content or 'descargar' in content.lower():
                        print("  -> Found 'DESCARGAR CATÁLOGO' button/link.")
                        # Regex or simple replace might be tricky if structure varies, but let's try robust replacement
                        # We'll replace href="..." with our new link for that specific button
                        import re
                        # Pattern to match the anchor tag containing the text
                        # <a ... href="..." ...> ... DESCARGAR CATÁLOGO ... </a>
                        
                        # Simplified approach: Just find the href in the context of the button text
                        # Or, seeing as the user said "Busca el botón 'DESCARGAR CATÁLOGO 📩' e inserta el enlace", 
                        # I'll rely on string replacement if I can identify the specific href.
                        
                        # Let's print the content first to be sure
                        # print(content)
                        
                        # For now, I will blindly replace ANY href that looks like a drive link OR just replace the whole button href if I can parse it. 
                        # User said: "Busca el botón 'DESCARGAR CATÁLOGO 📩' e inserta el enlace de arriba en el atributo href."
                        
                        # I'll print the content to a file to inspect before replacing, to be safe.
                        with open(f"workflow_{wf_id}_email_content.html", "w", encoding="utf-8") as f:
                            f.write(content)
                        print(f"  -> Saved HTML content to workflow_{wf_id}_email_content.html for inspection.")
                        target_workflow_id = wf_id
                        break
        
        if target_workflow_id:
            break

conn.close()
