import paramiko
import time

IP = "62.84.189.155"
USER = "root"
PASS = "Jorge0902"

# Configuration for soytu.puertadubai.online
NGINX_CONFIG = r"""server {
    listen 80;
    server_name soytu.puertadubai.online;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name soytu.puertadubai.online;

    # NEW DIRECTORY
    root /var/www/html_nueva/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # SSL Certs (Managed by Certbot - assuming certs exist for this subdomain)
    # If they don't exist, we might need to comment this out and run certbot first, 
    # but the user said "Certificado SSL (Modo Full)... asegúrate de que el servidor tenga su certificado"
    # We will try to use existing paths first.
    ssl_certificate /etc/letsencrypt/live/soytu.puertadubai.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/soytu.puertadubai.online/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
"""

def deploy_config():
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(IP, username=USER, password=PASS)
        
        print("Writing Nginx config for SOYTU...")
        remote_script = f"""
import os
with open('/etc/nginx/sites-available/soytu.puertadubai.online', 'w') as f:
    f.write({repr(NGINX_CONFIG)})
"""
        stdin, stdout, stderr = ssh.exec_command("python3")
        stdin.write(remote_script)
        stdin.close()
        
        # Capture python output if any
        out = stdout.read().decode()
        err = stderr.read().decode()
        if out: print("PyOut:", out)
        if err: print("PyErr:", err)
        
        # Link and Reload
        print("Linking and Reloading...")
        # Check if certs exist before reloading to avoid explosion
        check_certs = "test -f /etc/letsencrypt/live/soytu.puertadubai.online/fullchain.pem"
        stdin, stdout, stderr = ssh.exec_command(check_certs)
        if stdout.channel.recv_exit_status() != 0:
            print("WARNING: Certificates for soytu.puertadubai.online NOT found. Running certbot...")
            # If certs don't exist, we must comment out SSL lines temporarily or run certbot immediately.
            # Running certbot --nginx is safer as it modifies the file. 
            # Strategy: Write a basic HTTP config, run Certbot, then Certbot will add SSL.
            # But the user specifically asked for our config. 
            # Let's try running certbot to generate certs independently if missing.
            cmd_certbot = "certbot --nginx -d soytu.puertadubai.online --non-interactive --agree-tos -m jorgeraudelricardo@gmail.com --redirect"
            print(f"Executing: {cmd_certbot}")
            stdin, stdout, stderr = ssh.exec_command(cmd_certbot)
            while not stdout.channel.exit_status_ready():
                time.sleep(1)
            print("Certbot Out:", stdout.read().decode())
            print("Certbot Err:", stderr.read().decode())
        
        # Now link logic
        cmd_reload = "ln -sf /etc/nginx/sites-available/soytu.puertadubai.online /etc/nginx/sites-enabled/ && nginx -t && systemctl reload nginx"
        stdin, stdout, stderr = ssh.exec_command(cmd_reload)
        print("Reload Out:", stdout.read().decode())
        print("Reload Err:", stderr.read().decode())

        ssh.close()
        print("Done.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    deploy_config()
