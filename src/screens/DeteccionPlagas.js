import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { height, width } = Dimensions.get('window');

export default function DeteccionPlagas({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A3C34', '#4CAF50', '#E8F5E9']}
        style={styles.headerGradient}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animatable.View animation="fadeInDown" duration={1200} style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Detectar Plagas</Text>
          </View>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" duration={1200} delay={300} style={styles.content}>
          <Text style={styles.sectionTitle}>Herramienta de Detección</Text>
          <Text style={styles.description}>
            Selecciona una opción para detectar plagas en tu cultivo hidropónico:
          </Text>
          <TouchableOpacity style={styles.optionButton} onPress={() => console.log('Detectar por Foto')}>
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
          <Text style={styles.infoText}>
            Nota: Esta función está en desarrollo. Por ahora, selecciona una opción para simular la detección.
          </Text>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height * 0.35,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    transform: [{ scaleX: 1.2 }],
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  backButtonContainer: {
    padding: 10,
    borderRadius: 20,
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
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    letterSpacing: 1.5,
  },
  content: {
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    paddingVertical: 25,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A3C34',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  description: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
    fontStyle: 'italic',
    paddingHorizontal: 10,
  },
  optionButton: {
    borderRadius: 35,
    overflow: 'hidden',
    elevation: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 35,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});