const tf = require('@tensorflow/tfjs');
const path = require('path');

const loadModel = async () => {
  const modelPath = path.join(__dirname, 'model.json'); // Asegúrate de que apunte al archivo correcto
  try {
    const model = await tf.loadLayersModel(`file://${modelPath}`);
    console.log('Modelo cargado exitosamente');
    return model;
  } catch (error) {
    console.error('Error al cargar el modelo:', error);
    throw error;
  }
};

module.exports = { loadModel };