import paramiko
import time

HOST = "62.84.189.155"
USER = "root"
PASS = "Jorge0902"

def audit():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    print(f"Connecting to {HOST}...")
    try:
        client.connect(HOST, username=USER, password=PASS)
        print("Connected.")
        
        # 1. Check docker-compose.yml
        print("\n--- Checking for docker-compose.yml ---")
        stdin, stdout, stderr = client.exec_command("find / -name docker-compose.yml -not -path '*/overlay2/*'")
        files = stdout.read().decode().strip()
        if files:
            print(f"Found:\n{files}")
        else:
            print("WARNING: docker-compose.yml NOT FOUND!")
            
        # 2. Check /var/www/html
        print("\n--- Checking /var/www/html integrity ---")
        stdin, stdout, stderr = client.exec_command("ls -R /var/www/html")
        html_content = stdout.read().decode().strip()
        if not html_content:
             print("WARNING: /var/www/html appears empty or does not exist.")
        else:
             print(f"Content preview:\n{html_content[:500]}...") # Limit output

        # 3. Check Docker Logs (n8n)
        print("\n--- Checking Docker Processes & Logs ---")
        stdin, stdout, stderr = client.exec_command("docker ps --format '{{.Names}}'")
        containers = stdout.read().decode().strip().split('\n')
        print(f"Active containers: {containers}")
        
        n8n_container = next((c for c in containers if 'n8n' in c), None)
        if n8n_container:
            print(f"Fetching logs for {n8n_container}...")
            stdin, stdout, stderr = client.exec_command(f"docker logs --tail 20 {n8n_container} 2>&1")
            print(stdout.read().decode())
        else:
            print("WARNING: n8n container not found running.")

        # 4. Check Nginx Logs
        print("\n--- Checking Nginx Logs ---")
        stdin, stdout, stderr = client.exec_command("tail -n 20 /var/log/nginx/error.log")
        nginx_err = stdout.read().decode().strip()
        if nginx_err:
             print(f"Errors:\n{nginx_err}")
        else:
             print("No recent Nginx errors found (or file empty/missing).")

        # 5. Check Permissions
        print("\n--- Checking Permissions in /var/www/html ---")
        stdin, stdout, stderr = client.exec_command("stat -c '%A %a %n' /var/www/html/*")
        print(stdout.read().decode())

    except Exception as e:
        print(f"FATAL ERROR: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    audit()
