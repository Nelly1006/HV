from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import os
import io

app = Flask(__name__)

# Simulación de detección basada en palabras clave en la imagen (análisis básico)
def detect_plague(image_data):
    # Abrir imagen desde los bytes recibidos
    img = Image.open(io.BytesIO(image_data)).convert('RGB')
    img_array = np.array(img)

    # Simular detección basada en análisis simple (puedes ajustar las condiciones)
    symptoms = []
    if np.mean(img_array[:, :, 0]) > 200:  # Alta intensidad roja (puede indicar marchitez)
        symptoms.append('marchitez')
    if np.sum(img_array[:, :, 1] < 50) > 10000:  # Alta presencia de verde oscuro (planta sana)
        symptoms.append('sana')
    if np.sum(img_array[:, :, 2] > 150) > 5000:  # Alta intensidad azul (puede indicar moho)
        symptoms.append('moho')

    # Reglas de detección
    if 'marchitez' in symptoms:
        plague = "Pudrición radicular"
        advice = "Reduce el riego y mejora el drenaje. Elimina partes afectadas."
    elif 'moho' in symptoms:
        plague = "Mildiu"
        advice = "Aplica un fungicida orgánico y ventila bien el área."
    elif 'sana' in symptoms and not any(s in ['marchitez', 'moho'] for s in symptoms):
        plague = "Sin plaga"
        advice = "Tu planta está sana. Mantén el cuidado habitual."
    else:
        plague = "Plaga no identificada"
        advice = "Consulta a un experto para un diagnóstico preciso."

    return {
        "plague": plague,
        "advice": advice,
        "confidence": "Simulada (aproximada)"
    }

# Endpoint para recibir la imagen y devolver la predicción
@app.route('/detect', methods=['POST'])
def detect():
    if 'image' not in request.files:
        return jsonify({"error": "No se encontró la imagen"}), 400

    image_file = request.files['image']
    image_data = image_file.read()

    result = detect_plague(image_data)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)