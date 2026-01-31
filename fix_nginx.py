import paramiko

IP = "62.84.189.155"
USER = "root"
PASS = "Jorge0902"

NGINX_CONFIG = r"""server {
    listen 80;
    server_name puertadubai.online www.puertadubai.online;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name puertadubai.online www.puertadubai.online;

    root /var/www/html_nueva/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    ssl_certificate /etc/letsencrypt/live/puertadubai.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/puertadubai.online/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
"""

def deploy_config():
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(IP, username=USER, password=PASS)
        
        # Write config file
        print("Writing Nginx config...")
        # We use a temp python script on remote to write the file content safely
        remote_script = f"""
import os
with open('/etc/nginx/sites-available/puertadubai', 'w') as f:
    f.write({repr(NGINX_CONFIG)})
"""
        stdin, stdout, stderr = ssh.exec_command("python3")
        stdin.write(remote_script)
        stdin.close()
        
        print("STDOUT:", stdout.read().decode())
        print("STDERR:", stderr.read().decode())
        
        # Reload Nginx
        print("Reloading Nginx...")
        stdin, stdout, stderr = ssh.exec_command("nginx -t && systemctl reload nginx")
        print("STDOUT:", stdout.read().decode())
        print("STDERR:", stderr.read().decode())

        ssh.close()
        print("Done.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    deploy_config()
