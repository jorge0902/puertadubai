
import paramiko
import time

IP = "62.84.189.155"
USER = "root"
PASS = "Jorge0902"

try:
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(IP, username=USER, password=PASS)

    print("--- Checking n8n Container Status ---")
    stdin, stdout, stderr = ssh.exec_command("docker ps | grep n8n")
    n8n_ps = stdout.read().decode().strip()
    print(f"n8n Process:\n{n8n_ps}")
    
    if "n8n" in n8n_ps and "Up" in n8n_ps:
        print("n8n is running.")
    else:
        print("n8n is NOT running or restarted.")

    print("\n--- Checking recent n8n logs (last 20 lines) ---")
    stdin, stdout, stderr = ssh.exec_command("docker logs --tail 20 n8n")
    print(stdout.read().decode().strip())
    print(stderr.read().decode().strip()) # n8n logs often go to stderr

    ssh.close()
    
except Exception as e:
    print(f"SSH Failed: {e}")
