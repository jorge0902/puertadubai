import json

try:
    with open('current_workflow.json', 'r', encoding='utf-16') as f:
        data = json.load(f)
    
    nodes = data.get('nodes', [])
    updated = False
    
    # New code content
    new_js_code = r"""const fields = items[0].json.data?.fields || [];

const getVal = (text) => {
  if (!fields.length) return undefined;
  const found = fields.find(f => f.label && f.label.toLowerCase().includes(text.toLowerCase()));
  return found ? found.value : undefined;
};

// Fallback for direct JSON body (React Form or Tally)
const getBodyVal = (key) => items[0].json[key] || items[0].json.body?.[key];

const fullName = getBodyVal('nombre') || getBodyVal('Nombre') || getBodyVal('name') || getVal('nombre completo') || 'Amigo';
const firstName = fullName.trim().split(' ')[0] || 'Amigo';
// Capitalize
const firstNameCap = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
const fullNameCap = fullName.replace(/\b\w/g, l => l.toUpperCase());

return {
  json: {
    body: {
      proximidad_viaje: getBodyVal('proximidad_viaje') || getVal('cerca estás hoy'),
      pasaporte_ok: getBodyVal('pasaporte_ok') || getVal('pasaporte vigente'),
      presupuesto_rango: getBodyVal('presupuesto_rango') || getVal('presupuesto inicial'),
      meta_viaje: getBodyVal('meta_viaje') || getVal('meta principal'),
      Nombre: fullNameCap,
      PrimerNombre: firstNameCap,
      Email: getBodyVal('email') || getBodyVal('Email') || getVal('correo electrónico'),
      WhatsApp: getBodyVal('whatsapp') || getBodyVal('WhatsApp') || getVal('WhatsApp'),
      interes_contacto: getBodyVal('interes_contacto') || getVal('contacte personalmente')
    }
  }
};"""

    for node in nodes:
        if node['name'] == 'Adaptador Web' or node['name'] == 'Tally Adapter':
            print(f"Updating code for node: {node['name']}")
            node['parameters']['jsCode'] = new_js_code
            updated = True
            
    if updated:
        with open('fixed_workflow.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4)
        print("Successfully created fixed_workflow.json")
    else:
        print("Could not find 'Adaptador Web' or 'Tally Adapter' node.")
        
except Exception as e:
    print(f"Error: {e}")
