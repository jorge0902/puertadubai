import urllib.request
import json

url = "https://n8n.puertadubai.online/webhook/registro-isabel"
payload = {
  "nombre": "Juan Carlos Repara",
  "whatsapp": "53555999888",
  "email": "juan.repara@test.com",
  "interes": "Paquete VIP",
  "proximidad_viaje": "Pronto",
  "pasaporte_ok": "Si",
  "presupuesto_rango": "B. Entre $2,000 y $4,000 USD",
  "meta_viaje": "Vivir"
}

try:
    headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers)
    
    try:
        with urllib.request.urlopen(req) as response:
            print(f"Status: {response.status}")
            print(f"Response: {response.read().decode('utf-8')}")
    except urllib.error.HTTPError as e:
        print(f"HTTPError: {e.code} - {e.reason}")
        print(e.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
