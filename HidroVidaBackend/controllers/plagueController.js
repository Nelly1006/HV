const { loadModel } = require('../models/imageModel');
const tf = require('@tensorflow/tfjs-node');
const Jimp = require('jimp');

const plagueLabels = ['Plaga 1', 'Plaga 2', 'Plaga 3']; // Asegúrate que coincidan con tu modelo

const detectPlague = async (req, res) => {
  try {
    const model = await loadModel();

    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
    }

    const image = await Jimp.read(req.file.buffer);
    image.resize(224, 224); // Ajusta si tu modelo usa otras dimensiones
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    const tensor = tf.node.decodeImage(buffer, 3);
    const resizedTensor = tf.image.resizeBilinear(tensor, [224, 224]);
    const batchedTensor = resizedTensor.expandDims(0);
    const normalizedTensor = batchedTensor.div(255.0);

    const prediction = model.predict(normalizedTensor);
    const result = await prediction.data();

    const maxIndex = result.indexOf(Math.max(...result));
    const detectedPlague = plagueLabels[maxIndex] || 'No se detectó ninguna plaga';

    res.json({ result: [detectedPlague] });
  } catch (error) {
    console.error('Error en la detección:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { detectPlague };
