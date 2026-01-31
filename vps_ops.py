import paramiko
import time

IP = "62.84.189.155"
USER = "root"
PASS = "Jorge0902"

def run_ssh_command(command):
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(IP, username=USER, password=PASS)
        
        stdin, stdout, stderr = ssh.exec_command(command)
        # Wait for command to complete!
        exit_status = stdout.channel.recv_exit_status()
        
        out = stdout.read().decode().strip()
        err = stderr.read().decode().strip()
        
        ssh.close()
        return exit_status, out, err
    except Exception as e:
        return -1, "", str(e)

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        cmd = " ".join(sys.argv[1:])
        print(f"Executing: {cmd}")
        status, out, err = run_ssh_command(cmd)
        print(f"Exit Code: {status}")
        if out: 
            try:
                print(f"STDOUT:\n{out}")
            except UnicodeEncodeError:
                print("STDOUT (content hidden due to encoding error)")
        if err:
            try:
                print(f"STDERR:\n{err}")
            except UnicodeEncodeError:
                print("STDERR (content hidden due to encoding error)")
    else:
        print("Usage: python vps_ops.py <command>")
