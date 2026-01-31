import json

try:
    # Read with utf-16/utf-8 tolerance or just utf-16 since we used curl > file which is likely utf-16 on PS
    try:
        with open('validation_mess.json', 'r', encoding='utf-16') as f:
            data = json.load(f)
    except:
        with open('validation_mess.json', 'r', encoding='utf-8') as f:
            data = json.load(f)

    nodes = data.get('nodes', [])
    updated_count = 0

    # CORRECT UTF-8 TEXTS
    # WhatsApp Text
    whatsapp_text = "¡Hola, {{ $node['Adaptador Web'].json.body.PrimerNombre }}! ✨ Qué gusto saludarte.\n\nSoy Isabel, de Dhahabi Agency. Muchísimas gracias por registrarte y por tu interés en lo que estamos construyendo en Dubái. 🇦🇪\n\nAcabo de enviarte un regalo de bienvenida a tu correo electrónico: nuestro catálogo exclusivo con todo lo que necesitas saber para empezar en los Emiratos. 📩\n\nDos cositas rápidas: 1️⃣ Corre a revisar tu bandeja de entrada (si no lo ves, chequea en Spam, ¡a veces Google se pone caprichoso! 😅). 2️⃣ Guarda mi número en tus contactos para que siempre estemos conectados por aquí.\n\nCualquier duda que tengas, solo escríbeme. ¡Estoy lista para ayudarte! 🚀"

    # Email Subject
    email_subject = "¡Bienvenido a Dubái! 🇦🇪 Tu viaje empieza hoy ✨"

    # Email HTML (constructed from clean parts)
    email_html = """<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #333;">
    <!-- Banner -->
    <img src="http://62.84.189.155/imagenes/imagen1.jpg" alt="Puerta Dubái" style="width: 100%; max-width: 100%; height: auto; display: block;">
    
    <div style="padding: 30px;">
        <p style="font-size: 16px; line-height: 1.6;">¡Hola <strong>{{ $node['Adaptador Web'].json.body.PrimerNombre }}</strong>! ✨</p>
        
        <p style="font-size: 16px; line-height: 1.6;">No sabes la alegría que me da saludarte. Si estás leyendo esto, es porque algo dentro de ti ya empezó a viajar hacia los Emiratos. 🇦🇪✈️</p>
        
        <p style="font-size: 16px; line-height: 1.6;">Sé que dar el paso impone respeto —yo también estuve ahí—, pero quiero que sepas algo muy importante: <strong>no vas a hacerlo solo.</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6;">Estoy aquí para ser esa amiga experta que te guía, te cuida y te ahorra los dolores de cabeza que yo pasé. Mi misión en <em>Dhahabi Agency</em> no es venderte un trámite, es asegurarme de que tu llegada sea un éxito.</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="https://drive.google.com/uc?export=download&id=1tIqYM9A0fQFF2KILaT204j_07bQ-TtLv" style="background-color: #D4AF37; color: #ffffff; padding: 15px 30px; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 5px; display: inline-block; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 6px rgba(212, 175, 55, 0.3);">Descargar Catálogo 📩</a>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6;">Échale un vistazo con calma, visualízate allí... y cuando estés listo, hablamos.</p>
        
        <p style="font-size: 16px; line-height: 1.6; margin-top: 40px;">Con cariño,</p>
        
        <div style="margin-top: 10px;">
            <strong style="font-size: 18px;">Isabel</strong><br>
            <span style="color: #666;">CEO, Dhahabi Agency</span>
        </div>
        
        <!-- Footer -->
        <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid #eeeeee; text-align: center;">
            <!-- Logo Puerta Dubái -->
            <img src="http://62.84.189.155/imagenes/logo%20puertadubai.png" alt="Puerta Dubái" style="max-width: 80px; height: auto; display: inline-block; margin-bottom: 5px;">
            
            <p style="font-size: 10px; color: #bbb;">© 2026 Dhahabi Agency</p>
        </div>
    </div>
</div>"""

    for node in nodes:
        if node['name'] == 'Gmail SMTP':
            print("Fixing Gmail SMTP encoding...")
            node['parameters']['subject'] = email_subject
            node['parameters']['html'] = email_html
            updated_count += 1
        elif node['name'] == 'Evolution API Final':
            print("Fixing Evolution API encoding...")
            # We must be careful to preserve the structure of jsonBody string if it's a stringified JSON
            # However, looking at previous reads, it seems jsonBody IS a string.
            # "jsonBody": "={\n  \"number\": ... }"
            
            # Since the structure is complex with expression bindings, and we need to verify if we can just simple replace the text property.
            # The structure is:
            # { "number": ..., "textMessage": { "text": "THE CONTENT" } }
            
            # Let's rebuild the JSON string parts to be safe, or regex replace the "text": "..." part.
            # But regex with newlines is tricky.
            # Let's try to parse the expression part if possible, but n8n expressions start with '='
            
            # The node content seen in step 83:
            # "jsonBody": "={\n  \"number\": \"{{ ... }}\",\n  \"textMessage\": {\n    \"text\": \"...\"\n  }\n}"
            
            # We can reconstruct this string carefully using the KNOWN number expression.
            number_expression = "{{ ($json.whatsapp || $json.body.WhatsApp || $node['Webhook'].json.body.WhatsApp).toString().replace(/\\D/g, '') }}"
            # Wait, step 83 showed:
            # "number": "{{ ($json.whatsapp || $json.body.WhatsApp || $node['Webhook'].json.body.WhatsApp).toString().replace(/\\D/g, '') }}",
            
            # We will use f-string to perform replacement manually to avoid regex issues.
            # JSON-escaping the text for use inside a JSON STRING.
            
            escaped_text = json.dumps(whatsapp_text)[1:-1] # Get valid JSON string content (stripped of surrounding quotes)
            
            new_json_body = '={\n  "number": "' + number_expression + '",\n  "textMessage": {\n    "text": "' + escaped_text + '"\n  }\n}'
            
            node['parameters']['jsonBody'] = new_json_body
            updated_count += 1

    # Clean the workflow like before
    allowed_keys = ['name', 'nodes', 'connections', 'settings']
    cleaned_data = {k: v for k, v in data.items() if k in allowed_keys}

    with open('utf8_fix_workflow.json', 'w', encoding='utf-8') as f:
        json.dump(cleaned_data, f, indent=4, ensure_ascii=True) 
        # ensure_ascii=True is Key! It writes chars as \uXXXX which survives ANY pipe encoding issues.

    print(f"Updated {updated_count} nodes and saved to utf8_fix_workflow.json")

except Exception as e:
    print(f"Error: {e}")
