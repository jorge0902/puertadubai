import urllib.request
import urllib.error

urls = [
    "https://puertadubai.online/imagenes/imagen_cabecera.jpg",
    "https://puertadubai.online/imagenes/logo_pie.png"
]

print("Checking Definitive URLs...")
for url in urls:
    try:
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
