import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ImageBackground, Image, Alert, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';

const { height, width } = Dimensions.get('window');

// Predefined symptoms per plant
const plantSymptoms = {
  tomate: ['Manchas', 'Marchitez', 'Hojas amarillas', 'Deformación', 'Polvo blanco'],
  lechuga: ['Manchas', 'Deformación', 'Polvo naranja', 'Hojas marchitas', 'Textura viscosa'],
  pepino: ['Polvo blanco', 'Manchas negras', 'Picaduras', 'Hojas arrugadas', 'Crecimiento lento'],
};

// Plague data with explanation and advice
const plagueData = {
  tomate: {
    Mildiu: {
      plague: 'Mildiu',
      explanation: 'El mildiu es causado por el hongo *Phytophthora infestans*, que prospera en condiciones húmedas y cálidas, propagándose rápidamente por esporas en el aire.',
      advice: [
        'Aplica fungicida orgánico a base de cobre cada 7-10 días.',
        'Elimina y quema las hojas afectadas para evitar propagación.',
        'Mejora la ventilación entre plantas.',
        'Evita mojar el follaje al regar.',
      ],
    },
    'Pudrición radicular': {
      plague: 'Pudrición radicular',
      explanation: 'Causada por hongos como *Fusarium* o *Pythium*, suele ocurrir por exceso de riego o sustratos mal drenados, dañando las raíces.',
      advice: [
        'Reduce la frecuencia de riego y asegura un buen drenaje.',
        'Aplica un biofungicida al sustrato.',
        'Revisa las raíces y elimina las partes podridas.',
        'Mantén el pH del agua entre 5.5 y 6.5.',
      ],
    },
    'Mosca blanca': {
      plague: 'Mosca blanca',
      explanation: 'La mosca blanca (*Bemisia tabaci*) chupa la savia de las hojas, debilitando la planta y transmitiendo virus en ambientes cálidos y secos.',
      advice: [
        'Usa jabón potásico diluido (1%) y aplícalo al atardecer.',
        'Coloca trampas pegajosas amarillas cerca de las plantas.',
        'Introduce depredadores naturales como mariquitas.',
        'Limpia regularmente las hojas para eliminar huevos.',
      ],
    },
  },
  lechuga: {
    'Pudrición gris': {
      plague: 'Pudrición gris',
      explanation: 'Causada por el hongo *Botrytis cinerea*, se desarrolla en condiciones de alta humedad y mala ventilación, afectando hojas y tallos.',
      advice: [
        'Aplica un fungicida antifúngico cada 10 días.',
        'Mejora la ventilación y reduce la humedad ambiental.',
        'Elimina las hojas afectadas inmediatamente.',
        'Evita el contacto directo de las hojas con el sustrato.',
      ],
    },
    Ácaros: {
      plague: 'Ácaros',
      explanation: 'Los ácaros, como *Tetranychus urticae*, prosperan en ambientes secos y cálidos, causando moteado y deformación en las hojas.',
      advice: [
        'Aplica aceite de neem diluido (0.5%) cada 5 días.',
        'Mantén una humedad relativa superior al 60%.',
        'Limpia las hojas con agua tibia para eliminar ácaros.',
        'Revisa regularmente la parte inferior de las hojas.',
      ],
    },
    Royas: {
      plague: 'Royas',
      explanation: 'Causada por hongos como *Puccinia*, se caracteriza por manchas anaranjadas y se propaga en condiciones húmedas y cálidas.',
      advice: [
        'Elimina las partes afectadas y quémalas.',
        'Aplica un fungicida a base de azufre.',
        'Espacia las plantas para mejorar la circulación de aire.',
        'Riega por la mañana para que las hojas se sequen rápido.',
      ],
    },
  },
  pepino: {
    Oídio: {
      plague: 'Oídio',
      explanation: 'El oídio es causado por hongos como *Podosphaera xanthii*, que forman polvo blanco en las hojas en condiciones cálidas y secas.',
      advice: [
        'Aplica un fungicida a base de azufre o bicarbonato (1%).',
        'Mejora la ventilación y reduce la densidad de plantas.',
        'Evita el exceso de nitrógeno en el fertilizante.',
        'Riega al nivel del sustrato, no sobre las hojas.',
      ],
    },
    Antracnosis: {
      plague: 'Antracnosis',
      explanation: 'Causada por el hongo *Colletotrichum*, aparece en condiciones húmedas, causando manchas negras en hojas y frutos.',
      advice: [
        'Corta y elimina las partes afectadas con tijeras esterilizadas.',
        'Aplica un fungicida a base de cobre.',
        'Mantén las herramientas limpias para evitar propagación.',
        'Rota los cultivos para prevenir reincidencia.',
      ],
    },
    Trips: {
      plague: 'Trips',
      explanation: 'Los trips son insectos pequeños que perforan las hojas, causando picaduras y deformaciones, especialmente en climas cálidos.',
      advice: [
        'Usa insecticida natural a base de piretrina.',
        'Coloca trampas azules pegajosas alrededor de las plantas.',
        'Mantén la temperatura por debajo de 30°C.',
        'Aumenta la humedad para desalentar a los trips.',
      ],
    },
  },
  nonPlant: {
    'No es planta': {
      plague: 'No es planta',
      explanation: 'La imagen no muestra una planta o no se pudo identificar como tal.',
      advice: ['Por favor, selecciona una imagen de una planta para analizar.', 'Asegúrate de que la imagen muestre hojas, tallos o raíces.'],
    },
  },
};

export default function DeteccionPlagas() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null); // Foto seleccionada
  const [analysisStatus, setAnalysisStatus] = useState(null); // Estado para "Imagen analizada"
  const [detectionResult, setDetectionResult] = useState(null); // Resultado de detección
  const [selectedPlant, setSelectedPlant] = useState(null); // Planta seleccionada
  const [selectedSymptoms, setSelectedSymptoms] = useState({}); // Síntomas seleccionados
  const [plagueExplanation, setPlagueExplanation] = useState(null); // Explicación de la plaga
  const [plagueAdvice, setPlagueAdvice] = useState(null); // Consejos de cura

  // Solicitar permisos de galería al cargar
  useEffect(() => {
    (async () => {
      console.log('Solicitando permisos de galería...');
      const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('Estado de permisos - Galería:', galleryStatus);
      setHasPermission(galleryStatus === 'granted');
    })();
  }, []);

  // Detectar por foto (simulación local)
  const handleDetectByPhoto = async () => {
    if (hasPermission === null) {
      return Alert.alert('Solicitando permisos de galería...');
    }
    if (hasPermission === false) {
      return Alert.alert('No se tiene acceso a la galería. Habilita los permisos.');
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log('Foto seleccionada:', result.assets[0].uri);
        setPhoto(result.assets[0].uri);
        setAnalysisStatus(null);
        setDetectionResult(null);
        setPlagueExplanation(null);
        setPlagueAdvice(null);
        setSelectedSymptoms({});
      }
    } catch (err) {
      console.error('Error al procesar foto:', err);
      Alert.alert('Error', 'No se pudo analizar la imagen.');
    }
  };

  // Toggle symptom checkbox
  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) => ({
      ...prev,
      [symptom]: !prev[symptom],
    }));
  };

  // Handle plague detection with delay
  const handleDetectPlague = () => {
    if (!photo) {
      return Alert.alert('Error', 'Por favor, sube una foto de la planta.');
    }

    setAnalysisStatus(null); // Reset status to show loading effect
    setTimeout(() => {
      try {
        setAnalysisStatus('Imagen analizada');

        // Simulate non-plant detection (10% chance for demo)
        const isNonPlant = Math.random() < 0.1;
        if (isNonPlant) {
          setDetectionResult('No es planta');
          setPlagueExplanation(plagueData.nonPlant['No es planta'].explanation);
          setPlagueAdvice(plagueData.nonPlant['No es planta'].advice);
          return;
        }

        // Combine photo and symptom data for detection
        const selectedSymptomList = Object.keys(selectedSymptoms).filter((symptom) => selectedSymptoms[symptom]);
        let detectedPlague = 'Ninguna plaga detectada';
        let explanation = 'No se identificó una plaga específica con la información proporcionada.';
        let advice = ['Mantén el cuidado habitual de tu planta.'];

        const symptomToPlague = {
          tomate: {
            Manchas: 'Mildiu',
            Marchitez: 'Pudrición radicular',
            'Hojas amarillas': 'Mosca blanca',
            Deformación: 'Mosca blanca',
            'Polvo blanco': 'Mildiu',
          },
          lechuga: {
            Manchas: 'Pudrición gris',
            Deformación: 'Ácaros',
            'Polvo naranja': 'Royas',
            'Hojas marchitas': 'Pudrición gris',
            'Textura viscosa': 'Pudrición gris',
          },
          pepino: {
            'Polvo blanco': 'Oídio',
            'Manchas negras': 'Antracnosis',
            Picaduras: 'Trips',
            'Hojas arrugadas': 'Trips',
            'Crecimiento lento': 'Antracnosis',
          },
        };

        // Prioritize symptom-based detection if symptoms are selected
        if (selectedSymptomList.length > 0) {
          for (const symptom of selectedSymptomList) {
            const plague = symptomToPlague[selectedPlant][symptom];
            if (plague && plagueData[selectedPlant][plague]) {
              detectedPlague = plagueData[selectedPlant][plague].plague;
              explanation = plagueData[selectedPlant][plague].explanation;
              advice = plagueData[selectedPlant][plague].advice;
              break;
            }
          }
        } else {
          // Fallback to photo-based detection (simulated)
          const plagues = Object.keys(plagueData[selectedPlant]);
          const randomPlague = plagues[Math.floor(Math.random() * plagues.length)];
          detectedPlague = plagueData[selectedPlant][randomPlague].plague;
          explanation = plagueData[selectedPlant][randomPlague].explanation;
          advice = plagueData[selectedPlant][randomPlague].advice;
        }

        setDetectionResult(detectedPlague);
        setPlagueExplanation(explanation);
        setPlagueAdvice(advice);
      } catch (err) {
        console.error('Error al detectar plaga:', err);
        Alert.alert('Error', 'No se pudo procesar la detección.');
      }
    }, 2000); // 2-second delay to simulate analysis
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/plaga.jpg')} style={styles.backgroundImage} resizeMode="cover">
        <LinearGradient colors={['rgba(26, 60, 52, 0.7)', 'rgba(76, 175, 80, 0.5)']} style={styles.overlayGradient} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Animatable.View animation="fadeInLeft" duration={1000}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                <Text style={styles.backButton}>←</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>

          {/* Plant Selection at the Top */}
          <Animatable.View animation="fadeIn" duration={1000} style={styles.plantSelectionContainer}>
            <Text style={styles.formLabel}>Selecciona el tipo de planta:</Text>
            <View style={styles.plantButtonContainer}>
              <TouchableOpacity
                style={[styles.plantButton, selectedPlant === 'tomate' && styles.selectedPlantButton]}
                onPress={() => {
                  setSelectedPlant('tomate');
                  setPhoto(null);
                  setSelectedSymptoms({});
                }}
              >
                <Text style={styles.plantButtonText}>Tomate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.plantButton, selectedPlant === 'lechuga' && styles.selectedPlantButton]}
                onPress={() => {
                  setSelectedPlant('lechuga');
                  setPhoto(null);
                  setSelectedSymptoms({});
                }}
              >
                <Text style={styles.plantButtonText}>Lechuga</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.plantButton, selectedPlant === 'pepino' && styles.selectedPlantButton]}
                onPress={() => {
                  setSelectedPlant('pepino');
                  setPhoto(null);
                  setSelectedSymptoms({});
                }}
              >
                <Text style={styles.plantButtonText}>Pepino</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>

          {/* Photo Upload and Symptom Form */}
          {selectedPlant && (
            <Animatable.View animation="fadeInUp" duration={1000} delay={200} style={styles.content}>
              <Text style={styles.sectionTitle}>Detección de Plagas</Text>
              <Text style={styles.description}>
                Identifica plagas en tu cultivo hidropónico subiendo una foto y seleccionando los síntomas.
              </Text>

              <TouchableOpacity style={styles.optionButton} onPress={handleDetectByPhoto}>
                <LinearGradient colors={['#2E7D32', '#66BB6A']} style={styles.buttonGradient}>
                  <Text style={styles.buttonText}>SUBE FOTO DE TU PLAGA</Text>
                </LinearGradient>
              </TouchableOpacity>

              {photo && (
                <Animatable.View animation="fadeIn" duration={1000} delay={200} style={styles.resultContainer}>
                  <Image source={{ uri: photo }} style={styles.photoPreview} />
                  <View style={styles.symptomForm}>
                    <Text style={styles.formLabel}>Selecciona los síntomas observados:</Text>
                    {plantSymptoms[selectedPlant].map((symptom) => (
                      <View key={symptom} style={styles.checkboxContainer}>
                        <Checkbox
                          value={selectedSymptoms[symptom] || false}
                          onValueChange={() => toggleSymptom(symptom)}
                          color={selectedSymptoms[symptom] ? '#2E7D32' : undefined}
                        />
                        <Text style={styles.checkboxLabel}>{symptom}</Text>
                      </View>
                    ))}
                    <TouchableOpacity style={styles.submitButton} onPress={handleDetectPlague}>
                      <LinearGradient colors={['#2E7D32', '#66BB6A']} style={styles.buttonGradient}>
                        <Text style={styles.buttonText}>Detectar Plaga</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </Animatable.View>
              )}
            </Animatable.View>
          )}

          {/* Detection Results */}
          {analysisStatus && (
            <Animatable.View animation="fadeIn" duration={1000} delay={500} style={styles.resultContainer}>
              <Text style={styles.statusText}>{analysisStatus}</Text>
              {detectionResult && (
                <>
                  <Text style={styles.resultText}>Plaga detectada: {detectionResult}</Text>
                  {detectionResult !== 'No es planta' && (
                    <Text style={styles.resultText}>
                      Identificado por: {Object.keys(selectedSymptoms).some((s) => selectedSymptoms[s]) ? 'Foto y síntomas' : 'Foto'}
                    </Text>
                  )}
                  {plagueExplanation && (
                    <View style={styles.adviceContainer}>
                      <Text style={styles.adviceTitle}>¿Por qué ocurre?</Text>
                      <Text style={styles.adviceText}>{plagueExplanation}</Text>
                    </View>
                  )}
                  {plagueAdvice && (
                    <View style={styles.adviceContainer}>
                      <Text style={styles.adviceTitle}>Pasos para solucionar:</Text>
                      {plagueAdvice.map((step, index) => (
                        <Text key={index} style={styles.adviceText}>
                          {index + 1}. {step}
                        </Text>
                      ))}
                    </View>
                  )}
                </>
              )}
            </Animatable.View>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  overlayGradient: { ...StyleSheet.absoluteFillObject, opacity: 0.85 },
  scrollContent: { flexGrow: 1, paddingVertical: 20, paddingHorizontal: 20, paddingBottom: 40, alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', paddingBottom: 10, marginBottom: 10, justifyContent: 'flex-start', width: '100%' },
  backButtonContainer: { padding: 10, borderRadius: 25, backgroundColor: 'rgba(255, 255, 255, 0.3)', elevation: 5 },
  backButton: { fontSize: 24, color: '#FFFFFF', fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5 },
  plantSelectionContainer: { padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: 20, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15, shadowRadius: 5, width: '90%', alignItems: 'center', marginBottom: 20 },
  content: { padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: 20, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15, shadowRadius: 5, width: '90%', alignItems: 'center' },
  sectionTitle: { fontSize: 28, fontWeight: '800', color: '#1A3C34', textAlign: 'center', marginBottom: 15, letterSpacing: 1 },
  description: { fontSize: 16, color: '#555555', textAlign: 'center', marginBottom: 25, lineHeight: 24, fontStyle: 'italic' },
  optionButton: { borderRadius: 30, overflow: 'hidden', elevation: 6, marginBottom: 15, width: '80%', alignSelf: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15, shadowRadius: 5 },
  buttonGradient: { paddingVertical: 14, paddingHorizontal: 30, borderRadius: 30, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  resultContainer: { alignItems: 'center', marginTop: 20 },
  photoPreview: { width: 200, height: 200, borderRadius: 10, marginVertical: 10 },
  statusText: { fontSize: 16, color: '#1A3C34', textAlign: 'center', marginTop: 5, fontWeight: '500' },
  resultText: { fontSize: 18, color: '#1A3C34', textAlign: 'center', marginTop: 10, fontWeight: '600' },
  symptomForm: { width: '90%', padding: 15, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 15, elevation: 5, marginTop: 20 },
  formLabel: { fontSize: 16, color: '#1A3C34', marginBottom: 10, fontWeight: '500' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkboxLabel: { fontSize: 16, color: '#333', marginLeft: 10 },
  submitButton: { borderRadius: 30, overflow: 'hidden', elevation: 6, marginTop: 20, width: '60%', alignSelf: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15, shadowRadius: 5 },
  plantButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, width: '100%' },
  plantButton: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#ccc', marginHorizontal: 5 },
  selectedPlantButton: { backgroundColor: '#2E7D32' },
  plantButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  adviceContainer: { marginTop: 10, padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 10, width: '90%' },
  adviceTitle: { fontSize: 16, fontWeight: '600', color: '#2E7D32', marginBottom: 5 },
  adviceText: { fontSize: 14, color: '#333', marginBottom: 5 },
});