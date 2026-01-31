import paramiko
import json

IP = "62.84.189.155"
USER = "root"
PASS = "Jorge0902"

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(IP, username=USER, password=PASS)

print("--- Inspecting n8n Mounts ---")
stdin, stdout, stderr = ssh.exec_command("docker inspect n8n --format '{{json .Mounts}}'")
mounts_str = stdout.read().decode().strip()
print(mounts_str)

# Extract Source path for /home/node/.n8n
mounts = json.loads(mounts_str)
n8n_data_path = None
for mount in mounts:
    if mount['Destination'] == '/home/node/.n8n':
        n8n_data_path = mount['Source']
        break

if n8n_data_path:
    print(f"\nFound n8n data path: {n8n_data_path}")
    
    # Check if sqlite file exists
    db_path = f"{n8n_data_path}/database.sqlite"
    print(f"Checking for database at: {db_path}")
    
    # Use sqlite3 to query the db. We assume sqlite3 is installed on the HOST or we use a temporary container.
    # Check if sqlite3 is on host
    stdin, stdout, stderr = ssh.exec_command("which sqlite3")
    if stdout.read().strip():
        print("sqlite3 is installed on host. Querying...")
        query = "SELECT id, name, nodes FROM workflow_entity WHERE name LIKE '%registro%' OR name LIKE '%Isabel%';"
        cmd = f"sqlite3 {db_path} \"{query}\""
        stdin, stdout, stderr = ssh.exec_command(cmd)
        result = stdout.read().decode().strip()
        print(f"Workflows found:\n{result}")
    else:
        print("sqlite3 not found on host. Downloading DB to local to inspect...")
        # Since I am in python, I can use sftp
        sftp = ssh.open_sftp()
        try:
            sftp.get(db_path, "n8n_database.sqlite")
            print("Downloaded n8n_database.sqlite")
        except Exception as e:
            print(f"Failed to download: {e}")
        sftp.close()

else:
    print("Could not find n8n data mount.")

ssh.close()
