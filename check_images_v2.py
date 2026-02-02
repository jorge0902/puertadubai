import urllib.request
import urllib.error

urls = [
    "https://puertadubai.online/imagenes/imagen1.jpg",
    "https://puertadubai.online/imagenes/logo%20puertadubai.png"
]

print("Checking URLs...")
for url in urls:
    try:
        # User-Agent is sometimes needed to avoid 403 on some servers blocking scripts
        req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            print(f"URL: {url}")
            print(f"Status: {response.status}")
            print(f"Content-Type: {response.headers.get('Content-Type')}")
    except urllib.error.HTTPError as e:
        print(f"URL: {url}")
        print(f"Status: {e.code}")
    except Exception as e:
        print(f"Error checking {url}: {e}")
