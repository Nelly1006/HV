import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import * as DocumentPicker from 'expo-document-picker';

const { height, width } = Dimensions.get('window');

export default function PantallaDeteccionPlagas({ navigation }) {
  const [photo, setPhoto] = useState(null);

  const uploadPhoto = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: true,
      });
      console.log('Resultado de DocumentPicker:', JSON.stringify(result));
      if (result.type === 'success' && result.uri) {
        console.log('Foto subida correctamente:', result.uri);
        setPhoto(result.uri);
      } else {
        console.log('Subida cancelada o falló:', result);
        Alert.alert('Información', 'No se pudo cargar la foto. Asegúrate de seleccionar una imagen y otorgar permisos.');
      }
    } catch (error) {
      console.error('Error al subir foto:', error);
      Alert.alert('Error', 'No se pudo subir la foto. Verifica permisos de almacenamiento.');
    }
  };

  const analyzePhoto = () => {
    if (photo) {
      Alert.alert('Identificación de plaga', 'Análisis en desarrollo. Foto usada: ' + photo);
      console.log('Análisis de plaga iniciado con foto:', photo);
    } else {
      Alert.alert('Error', 'No hay foto para analizar. Sube una primero.');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#A5D6A7', '#E8F5E9']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.backgroundGradient}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detección de Plagas</Text>
        <View style={styles.placeholder} />
      </View>
      {photo ? (
        <Animatable.View animation="fadeIn" duration={800} style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.previewImage} />
          <TouchableOpacity style={styles.analyzeButton} onPress={analyzePhoto}>
            <LinearGradient
              colors={['#4CAF50', '#81C784']}
              style={styles.analyzeButtonGradient}
            >
              <Text style={styles.analyzeButtonText}>Identificar Plaga</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={() => setPhoto(null)}
          >
            <Text style={styles.retakeButtonText}>Subir Otra Foto</Text>
          </TouchableOpacity>
        </Animatable.View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.infoText}>La cámara no está disponible. Sube una foto para identificar la plaga.</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={uploadPhoto}>
            <LinearGradient
              colors={['#4CAF50', '#81C784']}
              style={styles.uploadButtonGradient}
            >
              <Text style={styles.uploadButtonText}>Subir Foto</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.9,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  infoText: {
    color: '#FF0000',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  uploadButton: {
    borderRadius: 25,
    overflow: 'hidden',
    width: '70%',
    marginVertical: 10,
  },
  uploadButtonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  previewImage: {
    width: '100%',
    height: '60%',
    borderRadius: 20,
    marginBottom: 20,
  },
  analyzeButton: {
    borderRadius: 25,
    overflow: 'hidden',
    width: '70%',
    marginBottom: 10,
  },
  analyzeButtonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  retakeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    elevation: 3,
  },
  retakeButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
});