import paramiko

HOST = "62.84.189.155"
USER = "root"
PASS = "Jorge0902"

def audit():
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        client.connect(HOST, username=USER, password=PASS)
        
        # 1. Check docker-compose.yml
        print("--- Docker Compose ---")
        stdin, stdout, stderr = client.exec_command("find / -name docker-compose.yml -not -path '*/overlay2/*'")
        print(stdout.read().decode().strip())
        
        # 2. Check N8n Status
        print("\n--- N8n Status ---")
        stdin, stdout, stderr = client.exec_command("docker ps | grep n8n")
        print(stdout.read().decode().strip())

        # 3. Check Web Content (Sample)
        print("\n--- Web Content ---")
        for folder in ['soytu', 'caiman', 'imagenes']:
            cmd = f"ls -1 /var/www/html/{folder} | head -n 5"
            stdin, stdout, stderr = client.exec_command(cmd)
            content = stdout.read().decode().strip()
            if content:
                print(f"/{folder}: Found {len(content.splitlines())} items (sample: {content.splitlines()[0]})")
            else:
                print(f"/{folder}: EMPTY OR MISSING")

    except Exception as e:
        print(f"ERROR: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    audit()
