import paramiko

IP = "62.84.189.155"
USER = "root"
PASS = "Jorge0902"

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(IP, username=USER, password=PASS)

print("--- Searching for docker-compose.yml ---")
stdin, stdout, stderr = ssh.exec_command("find / -name docker-compose.yml -not -path '*/overlay2/*' 2>/dev/null")
print(stdout.read().decode().strip())

print("\n--- Running Containers ---")
stdin, stdout, stderr = ssh.exec_command("docker ps --format '{{.Names}}'")
print(stdout.read().decode().strip())

ssh.close()
