import paramiko
import time

IP = "62.84.189.155"
USER = "root"
PASS = "Jorge0902"

def execute_command(ssh, command, description):
    print(f"\n--- {description} ---")
    print(f"Command: {command}")
    stdin, stdout, stderr = ssh.exec_command(command)
    out = stdout.read().decode().strip()
    err = stderr.read().decode().strip()
    if out:
        print(f"Output:\n{out}")
    if err:
        print(f"Error:\n{err}")
    return out

def main():
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        print(f"Connecting to {IP}...")
        ssh.connect(IP, username=USER, password=PASS)
        print("Connected.")

        # 1. Check for docker-compose.yml
        # Attempt to find it common locations or globally
        execute_command(ssh, "find /root /opt -name docker-compose.yml -maxdepth 3 2>/dev/null", "Searching for docker-compose.yml")
        
        # 2. Check running containers
        containers_out = execute_command(ssh, "docker ps --format '{{.Names}}'", "Listing Running Containers")
        containers = containers_out.split('\n') if containers_out else []
        
        # 3. Check logs
        if "n8n" in containers_out or "n8n_n8n_1" in containers_out:
            n8n_name = "n8n" if "n8n" in containers else [c for c in containers if "n8n" in c][0]
            execute_command(ssh, f"docker logs --tail 20 {n8n_name}", "n8n Container Logs")
        
        execute_command(ssh, "tail -n 20 /var/log/nginx/error.log || echo 'Nginx error log not found in standard path'", "Nginx Error Logs")

        # 4. Check /var/www/html integrity
        execute_command(ssh, "find /var/www/html -type d -empty", "Checking for Empty Directories in /var/www/html")
        execute_command(ssh, "ls -F /var/www/html | grep -v /$ | head -n 10", "Sample Files in /var/www/html root")

        # 5. Check Permissions
        execute_command(ssh, "stat -c '%A %a %n' /var/www/html", "Permissions of /var/www/html")
        execute_command(ssh, "find /var/www/html -maxdepth 2 -ls | head -n 10", "Sample file permissions in /var/www/html")

        ssh.close()
    except Exception as e:
        print(f"Failed to execute audit: {e}")

if __name__ == "__main__":
    main()
