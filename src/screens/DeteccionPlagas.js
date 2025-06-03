import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ImageBackground, Platform, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const { height, width } = Dimensions.get('window');

export default function DeteccionPlagas() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [photo, setPhoto] = useState(null); // Estado para almacenar la foto tomada o seleccionada
  const cameraRef = useRef(null); // Referencia para la cámara

  // Solicitar permisos de cámara y galería al cargar la pantalla
  useEffect(() => {
    (async () => {
      console.log('Solicitando permisos de cámara...');
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      console.log('Solicitando permisos de galería...');
      const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('Estado de permisos - Cámara:', cameraStatus, 'Galería:', galleryStatus);
      setHasPermission(cameraStatus === 'granted' && galleryStatus === 'granted');
    })();
  }, []);

  // Función para abrir la cámara
  const handleOpenCamera = async () => {
    if (hasPermission === null) {
      return alert('Solicitando permisos de cámara...');
    }
    if (hasPermission === false) {
      return alert('No se tiene acceso a la cámara o galería. Por favor, habilita los permisos en la configuración de tu dispositivo.');
    }
    setCameraVisible(true);
  };

  // Función para tomar una foto
  const handleTakePicture = async () => {
    if (cameraVisible && cameraRef.current) {
      try {
        const photoData = await cameraRef.current.takePictureAsync();
        console.log('Foto tomada:', photoData.uri);
        setPhoto(photoData.uri); // Guardar la foto tomada
        setCameraVisible(false);
        alert('Foto tomada con éxito. Procesando... (función en desarrollo)');
      } catch (err) {
        console.error('Error al tomar foto:', err);
        alert('Error al tomar la foto. Intenta de nuevo.');
      }
    }
  };

  // Función para seleccionar una foto desde la galería
  const handleDetectByPhoto = async () => {
    if (hasPermission === null) {
      return alert('Solicitando permisos de galería...');
    }
    if (hasPermission === false) {
      return alert('No se tiene acceso a la galería. Por favor, habilita los permisos en la configuración de tu dispositivo.');
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
        setPhoto(result.assets[0].uri); // Guardar la foto seleccionada
        alert('Foto seleccionada con éxito. Procesando... (función en desarrollo)');
      }
    } catch (err) {
      console.error('Error al seleccionar foto:', err);
      Alert.alert('Error', 'No se pudo seleccionar la foto. Verifica los permisos de galería.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/plaga.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(26, 60, 52, 0.7)', 'rgba(76, 175, 80, 0.5)']}
          style={styles.overlayGradient}
        />
        {cameraVisible ? (
          <View style={styles.cameraContainer}>
            <Camera
              style={styles.camera}
              type={Camera.Constants.Type.back}
              ref={(ref) => (cameraRef.current = ref)}
            >
              <View style={styles.cameraButtonContainer}>
                <TouchableOpacity onPress={() => setCameraVisible(false)} style={styles.closeCameraButton}>
                  <Text style={styles.closeCameraText}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTakePicture} style={styles.captureButton}>
                  <Text style={styles.captureButtonText}>Capturar</Text>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <Animatable.View animation="fadeInLeft" duration={1000}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                  <Text style={styles.backButton}>←</Text>
                </TouchableOpacity>
              </Animatable.View>
            </View>
            <Animatable.View animation="zoomIn" duration={1200} style={styles.content}>
              <Text style={styles.sectionTitle}>Detección de Plagas</Text>
              <Text style={styles.description}>
                Usa nuestras herramientas para identificar plagas en tu cultivo hidropónico de manera rápida y eficiente.
              </Text>
              <TouchableOpacity style={styles.optionButton} onPress={handleOpenCamera}>
                <LinearGradient
                  colors={['#2E7D32', '#66BB6A']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Abrir Cámara</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={handleDetectByPhoto}>
                <LinearGradient
                  colors={['#2E7D32', '#66BB6A']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Detectar por Foto</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton} onPress={() => console.log('Detectar por Síntomas')}>
                <LinearGradient
                  colors={['#2E7D32', '#66BB6A']}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Detectar por Síntomas</Text>
                </LinearGradient>
              </TouchableOpacity>
              {photo && (
                <Animatable.View animation="fadeIn" duration={1000} delay={200}>
                  <Image source={{ uri: photo }} style={styles.photoPreview} />
                </Animatable.View>
              )}
              <Text style={styles.infoText}>
                Nota: La detección está en desarrollo. Usa la cámara para capturar imágenes y simular la detección.
              </Text>
            </Animatable.View>
          </ScrollView>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlayGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.85,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 20,
    justifyContent: 'flex-start',
    width: '100%',
  },
  backButtonContainer: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    elevation: 5,
  },
  backButton: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A3C34',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 1,
  },
  description: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  optionButton: {
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 6,
    marginBottom: 15,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  buttonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginTop: 15,
    fontStyle: 'italic',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  cameraButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeCameraButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  closeCameraText: {
    fontSize: 18,
    color: '#1A3C34',
    fontWeight: 'bold',
  },
  captureButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
  },
  captureButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  photoPreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
    alignSelf: 'center',
  },
});