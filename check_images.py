import requests

urls = [
    "https://puertadubai.online/imagenes/imagen1.jpg",
    "https://puertadubai.online/imagenes/logo%20puertadubai.png"
]

print("Checking URLs...")
for url in urls:
    try:
        response = requests.head(url, timeout=10)
        print(f"URL: {url}")
        print(f"Status: {response.status_code}")
        print(f"Content-Type: {response.headers.get('Content-Type')}")
    except Exception as e:
        print(f"Error checking {url}: {e}")
