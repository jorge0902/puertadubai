import paramiko

IP = "62.84.189.155"
USER = "root"
PASS = "Jorge0902"

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(IP, username=USER, password=PASS)

print("--- Inspecting n8n Container Env ---")
stdin, stdout, stderr = ssh.exec_command("docker inspect n8n --format '{{json .Config.Env}}'")
print(stdout.read().decode().strip())

print("\n--- Listing Workflows via DB (if possible) ---")
# Try to find postgres credentials from the env above, but first let's just see if we can peek into the DB
# Assuming standard n8n postgres setup
# We will try to list workflows (id, name) from the postgres container
stdin, stdout, stderr = ssh.exec_command("docker exec -i evolution-api-postgres-1 psql -U n8n -d n8n -c 'SELECT id, name FROM workflow_entity;'")
# Note: container name might be different, let's try 'postgres' or 'n8n_postgres' or assume it uses the one we saw 'evolution-api-postgres-1' which might be shared? 
# Or n8n might be using sqlite. The Env check will tell us.
print(stdout.read().decode().strip())
print(stderr.read().decode().strip())

ssh.close()
